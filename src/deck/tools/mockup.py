import cv2, numpy as np
from PIL import Image, ImageDraw, ImageFilter
def rr(size, r, fill):
    m = Image.new('L', size, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, size[0]-1, size[1]-1), r, fill=255)
    im = Image.new('RGBA', size, fill); im.putalpha(m); return im
def persp(img, k=0.06, side='left'):
    a = np.asarray(img); h, w = a.shape[:2]
    pad = int(w * 0.02)
    src = np.float32([[0, 0], [w, 0], [w, h], [0, h]])
    if side == 'left':   # 오른쪽이 멀어짐
        dst = np.float32([[0, 0], [w*(1-k*0.6), h*k*0.5], [w*(1-k*0.6), h*(1-k*0.5)], [0, h]])
    else:
        dst = np.float32([[w*k*0.6, h*k*0.5], [w, 0], [w, h], [w*k*0.6, h*(1-k*0.5)]])
    M = cv2.getPerspectiveTransform(src, dst)
    out = cv2.warpPerspective(a, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    return Image.fromarray(out, 'RGBA')
def shadowed(img, blur=40, off=(0, 30), alpha=70, spread=1.0):
    w, h = img.size; P = blur * 3
    canvas = Image.new('RGBA', (w + 2*P, h + 2*P), (0, 0, 0, 0))
    sh = Image.new('RGBA', img.size, (27, 37, 89, 0)); sh.putalpha(img.getchannel('A').point(lambda v: v * alpha // 255))
    canvas.alpha_composite(sh, (P + off[0], P + off[1]))
    canvas = canvas.filter(ImageFilter.GaussianBlur(blur))
    canvas.alpha_composite(img, (P, P))
    bb = canvas.getbbox(); return canvas.crop(bb)
def monitor(screen, out, W=1800, tilt=0.05, side='left'):
    s = Image.open(screen).convert('RGB'); ar = s.height / s.width
    sw = W; sh = int(W * ar); b = int(W * 0.022)
    body = rr((sw + 2*b, sh + 2*b + int(W*0.03)), int(W*0.025), (28, 32, 46, 255))
    scr = s.resize((sw, sh), Image.LANCZOS).convert('RGBA')
    body.alpha_composite(scr, (b, b))
    # 아래 턱 하이라이트
    d = ImageDraw.Draw(body); cy = sh + 2*b + int(W*0.012)
    d.ellipse((body.width//2 - 8, cy - 4, body.width//2 + 8, cy + 12), fill=(70, 76, 98, 255))
    # 화면 반사광
    gl = Image.new('RGBA', body.size, (255, 255, 255, 0)); gd = ImageDraw.Draw(gl)
    gd.polygon([(int(body.width*0.55), 0), (int(body.width*0.78), 0), (int(body.width*0.45), body.height), (int(body.width*0.22), body.height)], fill=(255, 255, 255, 18))
    body.alpha_composite(gl)
    # 받침대
    neckw, neckh = int(W*0.14), int(W*0.16)
    full = Image.new('RGBA', (body.width, body.height + neckh + int(W*0.03)), (0, 0, 0, 0))
    neck = Image.new('RGBA', (neckw, neckh), (196, 201, 214, 255))
    ng = Image.linear_gradient('L').rotate(90, expand=True).resize((neckw, neckh))
    neck = Image.composite(Image.new('RGBA', neck.size, (222, 226, 236, 255)), Image.new('RGBA', neck.size, (168, 174, 190, 255)), ng)
    full.alpha_composite(neck, ((body.width - neckw)//2, body.height - 10))
    base = rr((int(W*0.42), int(W*0.03)), int(W*0.015), (205, 209, 221, 255))
    full.alpha_composite(base, ((body.width - base.width)//2, body.height + neckh - 14))
    full.alpha_composite(body, (0, 0))
    full = persp(full, tilt, side)
    shadowed(full, blur=int(W*0.02), off=(0, int(W*0.02)), alpha=60).save(out)
def phone(screen, out, W=700, tilt=0.08, side='right', crop_ratio=None):
    s = Image.open(screen).convert('RGB')
    if crop_ratio:  # 화면 비율 맞추기 (위쪽 기준)
        hh = int(s.width * crop_ratio); s = s.crop((0, 0, s.width, min(hh, s.height)))
    ar = s.height / s.width; b = int(W * 0.045)
    sw = W; sh = int(W * ar)
    body = rr((sw + 2*b, sh + 2*b), int(W*0.14), (24, 27, 38, 255))
    # 옆면 금속 테두리
    edge = rr((sw + 2*b, sh + 2*b), int(W*0.14), (120, 126, 150, 255)); inner = rr((sw + 2*b - 6, sh + 2*b - 6), int(W*0.135), (24, 27, 38, 255))
    edge.alpha_composite(inner, (3, 3)); body = edge
    scr = s.resize((sw, sh), Image.LANCZOS).convert('RGBA')
    m = Image.new('L', (sw, sh), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, sw-1, sh-1), int(W*0.1), fill=255); scr.putalpha(m)
    body.alpha_composite(scr, (b, b))
    gl = Image.new('RGBA', body.size, (255, 255, 255, 0)); gd = ImageDraw.Draw(gl)
    gd.polygon([(int(body.width*0.6), 0), (body.width, 0), (body.width, int(body.height*0.25)), (int(body.width*0.2), body.height*0 + int(body.height*0.55))], fill=(255, 255, 255, 14))
    body.alpha_composite(gl)
    body = persp(body, tilt, side)
    shadowed(body, blur=int(W*0.05), off=(int(W*0.03), int(W*0.05)), alpha=70).save(out)
