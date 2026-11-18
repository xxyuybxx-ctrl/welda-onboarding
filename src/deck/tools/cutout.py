import cv2, numpy as np
from PIL import Image
def cut(src, box, dst, iters=6, pad=12, shadow=False):
    im = np.asarray(Image.open(src).convert('RGB'))
    x0, y0, x1, y1 = box
    crop = im[y0:y1, x0:x1].copy()
    h, w = crop.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    rect = (pad, pad, w - 2 * pad, h - 2 * pad)
    bgd = np.zeros((1, 65), np.float64); fgd = np.zeros((1, 65), np.float64)
    cv2.grabCut(cv2.cvtColor(crop, cv2.COLOR_RGB2BGR), mask, rect, bgd, fgd, iters, cv2.GC_INIT_WITH_RECT)
    m = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
    # keep largest components (drop specks)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    keep = np.zeros_like(m)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] > 0.01 * h * w: keep[lab == i] = 255
    keep = cv2.morphologyEx(keep, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    keep = cv2.erode(keep, np.ones((3, 3), np.uint8), iterations=2)
    a = cv2.GaussianBlur(keep, (5, 5), 0).astype(np.float32) / 255.0
    # 테두리 흰 번짐 제거: 배경색 추정 후 색 분리
    bgmask = (keep == 0)
    bg = np.median(crop[bgmask], axis=0) if bgmask.any() else np.array([245, 245, 252])
    af = np.clip(a, 0.05, 1.0)[..., None]
    col = np.clip((crop.astype(np.float32) - (1 - af) * bg) / af, 0, 255)
    col = np.where(a[..., None] > 0.98, crop.astype(np.float32), col)
    out = np.dstack([col.astype(np.uint8), (a * 255).astype(np.uint8)])
    ys, xs = np.where(out[..., 3] > 10)
    out = out[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    Image.fromarray(out, 'RGBA').save(dst)
    return out.shape
if __name__ == '__main__':
    import sys
    print(cut(sys.argv[1], tuple(map(int, sys.argv[2].split(','))), sys.argv[3]))
