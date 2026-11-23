import os,sys
d=os.path.dirname(os.path.abspath(__file__))
r=lambda f:open(os.path.join(d,f),encoding='utf-8').read()
js_files=['data-basis.js','data-h1.js','data-h2.js','data-h3.js','data-h4.js','data-h5.js','data-h6.js','data-h7.js','data-h8.js','data-examen.js','core.js','ui.js','examen.js']
js='\n'.join(r(f) for f in js_files if os.path.exists(os.path.join(d,f)))
out=r('shell.html').replace('/*CSS*/',r('app.css')).replace('/*JS*/',js)
url=os.environ.get('ENDPOINT','')
if url: out=out.replace('const DATA_ENDPOINT_URL = "";','const DATA_ENDPOINT_URL = "%s";'%url)
dest=sys.argv[1] if len(sys.argv)>1 else os.path.join(d,'..','index.html')
open(dest,'w',encoding='utf-8').write(out); print(dest,len(out))
