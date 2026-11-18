import sys, time, subprocess, uno
from com.sun.star.beans import PropertyValue
src, out = sys.argv[1], sys.argv[2]
p = subprocess.Popen(['soffice','--headless','--invisible','--norestore','--accept=socket,host=localhost,port=2002;urp;'])
ctx=None
for _ in range(60):
    try:
        lc = uno.getComponentContext()
        r = lc.ServiceManager.createInstanceWithContext('com.sun.star.bridge.UnoUrlResolver', lc)
        ctx = r.resolve('uno:socket,host=localhost,port=2002;urp;StarOffice.ComponentContext'); break
    except Exception: time.sleep(1)
smgr = ctx.ServiceManager
desk = smgr.createInstanceWithContext('com.sun.star.frame.Desktop', ctx)
def pv(n,v):
    x=PropertyValue(); x.Name=n; x.Value=v; return x
doc = desk.loadComponentFromURL(uno.systemPathToFileUrl(src), '_blank', 0, (pv('Hidden',True),))
def walk(shapes):
    for i in range(shapes.getCount()):
        sh = shapes.getByIndex(i)
        if sh.supportsService('com.sun.star.drawing.GroupShape'): walk(sh); continue
        try:
            en = sh.getText().createEnumeration()
            while en.hasMoreElements():
                para = en.nextElement()
                try: para.setPropertyValue('ParaIsCharacterDistance', False)
                except Exception as e: pass
        except Exception: pass
pages = doc.getDrawPages()
for i in range(pages.getCount()): walk(pages.getByIndex(i))
doc.storeToURL(uno.systemPathToFileUrl(out), (pv('FilterName','impress_pdf_Export'),))
doc.close(True)
try: desk.terminate()
except Exception: pass
p.wait(timeout=30)
