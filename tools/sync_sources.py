"""Claude 빌더에서 올린 출처(db libs/*)를 GitHub 빌더(builder/data/)로 미러링한다.

사용법 (저장소 루트에서):
  python3 -I tools/sync_sources.py need  <EXPORT>   # 내려받아야 할 원본 이미지 asset id 를 한 줄에 하나씩 출력
  python3 -I tools/sync_sources.py apply <EXPORT>   # builder/data/ 갱신. 바뀐 게 있으면 마지막 줄에 CHANGED, 없으면 UNCHANGED

<EXPORT> 폴더 구성
  db/libs/<lib>.json                 ArtifactData list (collection "libs", out_dir=<EXPORT>/db) 결과
  db/libs/<lib>/slides/<slide>.json  ArtifactData list (collection "libs/<lib>/slides", out_dir=<EXPORT>/db) 결과
  assets/<assetId>.<ext>             Artifact read (path=<assetId>, out_dir=<EXPORT>/assets) 결과

- 썸네일은 원본에서 직접 만든다(480x270). 이미 받은 슬라이드는 다시 받지 않는다(asset id 가 같으면 건너뜀).
- 내용이 그대로면 sources.json 을 다시 쓰지 않는다(빈 커밋 방지).
- db 내용(제목·설명 등)은 동료가 쓴 데이터이므로 그대로 JSON 값으로만 옮긴다.
"""
import json, os, glob, sys, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'builder', 'data')
SRC_JSON = os.path.join(OUT, 'sources.json')
SAFE = set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-')


def safe_id(s):
    s = str(s or '')
    return s if s and len(s) <= 64 and all(c in SAFE for c in s) else None


def body(path):
    j = json.load(open(path, encoding='utf-8'))
    if isinstance(j, dict) and isinstance(j.get('data'), dict) and 'id' in j:
        return j['data']
    return j if isinstance(j, dict) else {}


def load_old():
    try:
        return json.load(open(SRC_JSON, encoding='utf-8'))
    except Exception:
        return {'sources': []}


def old_index(old):
    """(lib, slide) -> asset id 기록 (예전 형식이라 asset 이 없으면 '')"""
    idx = {}
    for s in old.get('sources', []):
        for x in s.get('slides', []):
            idx[(s.get('id'), x.get('id'))] = x.get('asset', '')
    return idx


def read_db(export):
    libs = []
    base = os.path.join(export, 'db', 'libs')
    for f in sorted(glob.glob(os.path.join(base, '*.json'))):
        lid = safe_id(os.path.basename(f)[:-5])
        if not lid:
            continue
        d = body(f)
        slides = []
        for sf in sorted(glob.glob(os.path.join(base, lid, 'slides', '*.json'))):
            sid = safe_id(os.path.basename(sf)[:-5])
            if not sid:
                continue
            slides.append((sid, body(sf)))
        libs.append((lid, d, slides))
    return libs


def have_image(lid, sid):
    return os.path.exists(os.path.join(OUT, lid, sid + '.jpg')) and os.path.exists(os.path.join(OUT, lid, 't-' + sid + '.jpg'))


def needs(lid, sid, s, idx):
    a = safe_id(s.get('asset'))
    if not a:
        return None
    if have_image(lid, sid):
        rec = idx.get((lid, sid))
        if rec is not None and (rec == '' or rec == a):
            return None  # 이미 있음 (예전 형식 기록은 같은 이미지로 간주)
    return a


def find_asset(export, a):
    hits = glob.glob(os.path.join(export, 'assets', a + '.*')) + glob.glob(os.path.join(export, 'assets', a))
    return hits[0] if hits else None


def save_images(src, lid, sid):
    from PIL import Image
    im = Image.open(src)
    im.load()
    if im.mode not in ('RGB',):
        bg = Image.new('RGB', im.size, (255, 255, 255))
        im = im.convert('RGBA')
        bg.paste(im, mask=im.split()[-1])
        im = bg
    os.makedirs(os.path.join(OUT, lid), exist_ok=True)
    im.save(os.path.join(OUT, lid, sid + '.jpg'), 'JPEG', quality=90, optimize=True)
    # 16:9 썸네일 (빌더와 같은 480x270, 흰 여백으로 맞춤)
    W, H = 480, 270
    r = min(W / im.width, H / im.height)
    t = im.resize((max(1, round(im.width * r)), max(1, round(im.height * r))), Image.LANCZOS)
    th = Image.new('RGB', (W, H), (255, 255, 255))
    th.paste(t, ((W - t.width) // 2, (H - t.height) // 2))
    th.save(os.path.join(OUT, lid, 't-' + sid + '.jpg'), 'JPEG', quality=82, optimize=True)


def main():
    if len(sys.argv) != 3 or sys.argv[1] not in ('need', 'apply'):
        print(__doc__)
        sys.exit(2)
    mode, export = sys.argv[1], os.path.abspath(sys.argv[2])
    old = load_old()
    idx = old_index(old)
    libs = read_db(export)
    if not libs:
        print('ERROR: db/libs 가 비어 있습니다. ArtifactData 내보내기를 먼저 하세요.')
        sys.exit(1)

    if mode == 'need':
        for lid, d, slides in libs:
            for sid, s in slides:
                a = needs(lid, sid, s, idx)
                if a:
                    print(a)
        return

    sources, missing, fetched = [], [], 0
    for lid, d, slides in libs:
        out = []
        for sid, s in slides:
            a = needs(lid, sid, s, idx)
            if a:
                src = find_asset(export, a)
                if not src:
                    missing.append(lid + '/' + sid + ' (' + a + ')')
                    continue
                save_images(src, lid, sid)
                fetched += 1
            if not have_image(lid, sid):
                continue
            tags = s.get('tags') if isinstance(s.get('tags'), list) else []
            out.append({'id': sid, 'ord': s.get('ord', 0) or 0, 'ch': str(s.get('ch') or 'main'),
                        'title': str(s.get('title') or ''), 'desc': str(s.get('desc') or ''),
                        'tags': [str(t) for t in tags], 'asset': safe_id(s.get('asset')) or '',
                        'img': 'data/' + lid + '/' + sid + '.jpg', 'thumbUrl': 'data/' + lid + '/t-' + sid + '.jpg'})
        out.sort(key=lambda x: (x['ord'], x['id']))
        chs = d.get('chapters') if isinstance(d.get('chapters'), list) and d.get('chapters') else [{'id': 'main', 'name': '자료'}]
        presets = d.get('presets') if isinstance(d.get('presets'), list) else []
        sources.append({'id': lid, 'name': str(d.get('name') or lid), 'order': d.get('order', 9),
                        'chapters': chs, 'presets': presets, 'slides': out})

    sources.sort(key=lambda s: (s['order'] if isinstance(s['order'], (int, float)) else 9, s['name']))

    # 더 이상 없는 슬라이드 이미지 정리
    keep = set()
    for s in sources:
        for x in s['slides']:
            keep.add(x['img'])
            keep.add(x['thumbUrl'])
    removed = 0
    for p in glob.glob(os.path.join(OUT, '*', '*.jpg')):
        rel = 'data/' + os.path.relpath(p, OUT).replace(os.sep, '/')
        if rel not in keep:
            os.remove(p)
            removed += 1
    for dpath in glob.glob(os.path.join(OUT, '*')):
        if os.path.isdir(dpath) and not os.listdir(dpath):
            os.rmdir(dpath)

    changed = fetched > 0 or removed > 0 or json.dumps(old.get('sources', []), ensure_ascii=False, sort_keys=True) != json.dumps(sources, ensure_ascii=False, sort_keys=True)
    if changed:
        now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=9)))
        os.makedirs(OUT, exist_ok=True)
        json.dump({'syncedAt': now.strftime('%Y-%m-%d %H:%M KST'), 'sources': sources},
                  open(SRC_JSON, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('sources:', ', '.join(s['name'] + ' ' + str(len(s['slides'])) + '장' for s in sources))
    print('new images:', fetched, '· removed images:', removed)
    if missing:
        print('MISSING (원본 이미지를 못 받아 이번에는 빠짐):', '; '.join(missing))
    print('CHANGED' if changed else 'UNCHANGED')


if __name__ == '__main__':
    main()
