# assets/ 안 이미지 크기를 assets.json에 기록 (빌드 전에 실행)
from PIL import Image
import glob, json, os
D = os.path.dirname(os.path.abspath(__file__))
d = {os.path.basename(f): Image.open(f).size for f in sorted(glob.glob(os.path.join(D, 'assets', '*.*')))}
json.dump(d, open(os.path.join(D, 'assets.json'), 'w'))
print(len(d))
