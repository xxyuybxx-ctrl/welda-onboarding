import numpy as np, math
from PIL import Image, ImageDraw, ImageFilter
def hexpts(cx, cy, r, rot=0):
    return [(cx + r*math.cos(math.radians(60*i - 90 + rot)), cy + r*math.sin(math.radians(60*i - 90 + rot))) for i in range(6)]
def grad(size, c1, c2, angle=135):
    w, h = size; y, x = np.mgrid[0:h, 0:w]
    a = math.radians(angle); t = (x*math.cos(a) + y*math.sin(a)); t = (t - t.min()) / (t.max() - t.min())
    c1 = np.array(c1, float); c2 = np.array(c2, float)
    return Image.fromarray((c1 + (c2 - c1) * t[..., None]).astype(np.uint8), 'RGB')
def hex3d(r=400, top=(196, 182, 255), bot=(108, 78, 240), side=(74, 54, 184), depth=0.16, alpha=255, glass=False, out=None):
    S = 2; R = r*S; W = int(R*2.4); H = int(R*2.6)
    cx, cy = W/2, R*1.15
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    # 그림자
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).ellipse((cx - R*0.85, cy + R*1.0, cx + R*0.85, cy + R*1.28), fill=110)
    sh = sh.filter(ImageFilter.GaussianBlur(R*0.09))
    shl = Image.new('RGBA', (W, H), (40, 30, 110, 0)); shl.putalpha(sh); im.alpha_composite(shl)
    # 옆면(두께)
    d = R*depth
    m = Image.new('L', (W, H), 0); dr = ImageDraw.Draw(m)
    p = hexpts(cx, cy, R); q = [(x, y + d) for x, y in p]
    dr.polygon(q, fill=255)
    for i in range(6):
        dr.polygon([p[i], p[(i+1) % 6], q[(i+1) % 6], q[i]], fill=255)
    sideim = grad((W, H), side, tuple(int(v*0.75) for v in side), 90).convert('RGBA'); sideim.putalpha(m)
    im.alpha_composite(sideim)
    # 윗면
    m2 = Image.new('L', (W, H), 0); ImageDraw.Draw(m2).polygon(p, fill=255)
    face = grad((W, H), top, bot, 120).convert('RGBA'); face.putalpha(m2)
    im.alpha_composite(face)
    # 하이라이트(왼쪽 위 빛)
    hlm = Image.new('L', (W, H), 0); ImageDraw.Draw(hlm).ellipse((cx - R*0.75, cy - R*0.95, cx + R*0.15, cy - R*0.15), fill=120)
    hlm = hlm.filter(ImageFilter.GaussianBlur(R*0.18))
    hlm = Image.fromarray(np.minimum(np.asarray(hlm), np.asarray(m2)))
    hli = Image.new('RGBA', (W, H), (255, 255, 255, 0)); hli.putalpha(hlm); im.alpha_composite(hli)
    # 테두리 빛
    rim = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(rim).line(p + [p[0]], fill=(255, 255, 255, 90), width=int(R*0.025), joint='curve')
    im.alpha_composite(rim.filter(ImageFilter.GaussianBlur(R*0.008)))
    if alpha < 255:
        a = np.asarray(im.getchannel('A')).astype(float) * alpha / 255; im.putalpha(Image.fromarray(a.astype(np.uint8)))
    im = im.crop(im.getbbox()).resize((im.getbbox()[2]//S - im.getbbox()[0]//S, im.getbbox()[3]//S - im.getbbox()[1]//S), Image.LANCZOS)
    if out: im.save(out)
    return im
def bg(out, W=2667, H=1500, blobs=()):
    base = np.ones((H, W, 3)) * 255.0
    y, x = np.mgrid[0:H, 0:W]
    for (bx, by, br, col, k) in blobs:
        d = np.sqrt((x - bx*W)**2 + (y - by*H)**2) / (br*W)
        t = np.clip(1 - d, 0, 1) ** 2 * k
        base = base * (1 - t[..., None]) + np.array(col) * t[..., None]
    Image.fromarray(base.astype(np.uint8)).save(out, quality=92)
if __name__ == '__main__':
    O = '/home/claude/deck3/assets/'
    hex3d(400, out=O + 'hex_violet.png')
    hex3d(400, top=(236, 232, 255), bot=(196, 184, 250), side=(160, 142, 236), out=O + 'hex_lilac.png')
    hex3d(400, top=(255, 255, 255), bot=(226, 230, 244), side=(190, 196, 216), out=O + 'hex_pearl.png')
    hex3d(400, top=(120, 210, 222), bot=(20, 151, 168), side=(12, 110, 124), out=O + 'hex_teal.png')
    bg(O + 'bg_cover.jpg', blobs=[(0.78, 0.45, 0.55, (226, 218, 255), 0.95), (0.98, 0.05, 0.35, (214, 236, 246), 0.6), (0.1, 1.05, 0.4, (238, 234, 254), 0.7)])
    bg(O + 'bg_content.jpg', blobs=[(1.0, 0.0, 0.45, (236, 231, 255), 0.85), (0.0, 1.0, 0.35, (240, 244, 252), 0.8)])
