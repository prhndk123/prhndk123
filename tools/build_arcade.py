from pathlib import Path
import html
import re
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
def save(name, content):
    height, body = content.split('|', 1)
    source = f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="{height}" viewBox="0 0 1200 {height}">{body}</svg>'
    ET.fromstring(source)
    (ASSETS / name).write_text(source, encoding='utf-8')

save('arcade-terminal.svg', '''300|<defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="#9b91bf" opacity=".1"/></pattern></defs>
<rect x="1" y="1" width="1198" height="298" rx="12" fill="#151623" stroke="#39364f"/>
<rect x="1" y="1" width="1198" height="45" rx="12" fill="#202032"/><path d="M1 45H1199" stroke="#39364f"/>
<circle cx="25" cy="24" r="5" fill="#ff8fa4"/><circle cx="43" cy="24" r="5" fill="#f3cd8d"/><circle cx="61" cy="24" r="5" fill="#a3ffbd"/>
<text x="600" y="29" text-anchor="middle" fill="#aaa1be" font-family="monospace" font-size="12">player-profile / prhndk123</text>
<rect x="1" y="46" width="1198" height="253" fill="url(#dots)"/>
<g font-family="monospace" font-size="21"><text x="36" y="94" fill="#a3ffbd">❯ whoami</text>
<text x="36" y="136" fill="#f3f1e9" font-size="32" font-weight="bold">Hey, I'm Prihandika.</text>
<text x="36" y="174" fill="#b4acc8">Building web projects. Exploring interfaces.</text>
<text x="36" y="206" fill="#b4acc8">Learning by making things — one commit at a time.</text>
<text x="36" y="263" fill="#c4aff5" font-size="17">TypeScript / React / React Router</text>
<rect x="402" y="246" width="10" height="20" fill="#a3ffbd"><animate attributeName="opacity" values="1;1;0;0" dur="1.2s" repeatCount="indefinite"/></rect></g>
<g fill="#a3ffbd"><path d="M16 0H32V16H64V0H80V16H64V32H80V48H96V96H80V112H64V96H32V112H16V96H0V48H16V32H32V16H16Z"/><rect x="16" y="112" width="16" height="16"/><rect x="64" y="112" width="16" height="16"/><path d="M0 48H-16V80H0M96 48H112V80H96"/><rect x="20" y="48" width="16" height="16" fill="#151623"/><rect x="60" y="48" width="16" height="16" fill="#151623"/><animateTransform attributeName="transform" type="translate" values="1010 100;1010 94;1010 100" dur="3s" repeatCount="indefinite"/></g>''')

save('commit-catcher-preview.svg', '''440|<defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#c4aff5" stroke-opacity=".06"/></pattern><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#141727"/><stop offset="1" stop-color="#282139"/></linearGradient></defs>
<rect x="1" y="1" width="1198" height="438" rx="12" fill="url(#sky)" stroke="#474057"/><rect x="2" y="2" width="1196" height="436" rx="12" fill="url(#grid)"/>
<path d="M30 72H1170" stroke="#474057"/><g font-family="monospace" font-size="16"><text x="34" y="43" fill="#a3ffbd">BONUS STAGE 01</text><text x="1165" y="43" text-anchor="end" fill="#ff8fa4">♥ ♥ ♥ / 45s</text></g>
<g fill="#c4aff5" opacity=".5"><rect x="705" y="115" width="3" height="3"/><rect x="1120" y="150" width="4" height="4"/><rect x="980" y="90" width="3" height="3"/><rect x="870" y="205" width="3" height="3"/></g>
<g font-family="monospace"><text x="38" y="146" fill="#c4aff5" font-size="15" letter-spacing="3">A TINY GAME FOR YOUR VISIT</text><text x="34" y="205" fill="#f3f1e9" font-size="47" font-weight="bold">COMMIT CATCHER</text><text x="38" y="246" fill="#b5acc9" font-size="19">Catch commits. Dodge bugs. Chase a high score.</text><rect x="38" y="287" width="242" height="53" fill="#a3ffbd"/><text x="65" y="320" fill="#14251d" font-size="19" font-weight="bold">▶ CLICK TO PLAY</text><text x="38" y="393" fill="#8f869f" font-size="14">KEYBOARD + TOUCH / NO SIGN-UP / JUST ONE MORE RUN</text></g>
<g fill="#a3ffbd"><rect x="792" y="95" width="22" height="22"><animate attributeName="y" values="95;300;95" dur="4s" repeatCount="indefinite"/></rect><rect x="1020" y="160" width="22" height="22"><animate attributeName="y" values="160;340;160" dur="3.4s" repeatCount="indefinite"/></rect></g>
<g fill="#ff8fa4"><path d="M0 0H32V8H40V24H32V32H0V24H-8V8H0Z"/><rect x="0" y="9" width="8" height="8" fill="#232036"/><rect x="24" y="9" width="8" height="8" fill="#232036"/><animateTransform attributeName="transform" type="translate" values="916 100;916 290;916 100" dur="4.8s" repeatCount="indefinite"/></g>
<path d="M720 374H1140" stroke="#a3ffbd" opacity=".3"/>
<g><g fill="#a3ffbd"><path d="M-28 0H28V12H40V24H-40V12H-28Z"/><rect x="-16" y="-12" width="32" height="14"/><rect x="-8" y="-20" width="16" height="8"/></g><rect x="-7" y="-8" width="14" height="12" fill="#273442"/><path d="M-26 26H-14V36H-26M14 26H26V36H14" fill="#f3cd8d"/><animateTransform attributeName="transform" type="translate" values="800 330;1040 330;800 330" dur="5s" repeatCount="indefinite"/></g>''')

patterns=[['00111100','01111110','11011011','11000011','11111111','01100110','01000010','11000011'],['00111100','01000010','10011001','10111101','10111101','10011001','01000010','00111100'],['11111111','10000001','10111101','10000001','10111001','10000001','10111101','11111111'],['00011000','00111100','01111110','11111111','01111110','01011010','01011010','11111111']]
cards=[('portfolio','01','Portfolio website','A personal space on the web.','#a3ffbd','THE HOME BASE'),('events','02','Event management','A frontend project for events.','#c4aff5','THE GATHERING'),('blog','03','Blog','Exploring the React Router framework.','#f3cd8d','THE STORY ROOM'),('company','04','Company profile','A web presence for a business.','#ff8fa4','THE BUSINESS DISTRICT')]
for index,(slug,num,title,desc,color,subtitle) in enumerate(cards):
    pixels=''.join(f'<rect x="{1010+x*14}" y="{91+y*14}" width="14" height="14"/>' for y,row in enumerate(patterns[index]) for x,value in enumerate(row) if value=='1')
    save(f'quest-{slug}.svg',f'''330|<rect x="1" y="1" width="1198" height="328" fill="#171827" rx="10" stroke="#39364f"/><path d="M1 1H1199" stroke="{color}" stroke-width="3"/><g font-family="monospace"><text x="34" y="51" fill="{color}" font-size="18" letter-spacing="2">WORLD {num} / {subtitle}</text><text x="31" y="127" fill="#f3f1e9" font-size="48" font-weight="bold">{html.escape(title)}</text><text x="34" y="177" fill="#aaa1bc" font-size="25">{html.escape(desc)}</text><path d="M34 224H1166" stroke="#39364f"/><text x="34" y="281" fill="{color}" font-size="23">EXPLORE REPOSITORY →</text><text x="1166" y="281" fill="#81768f" font-size="18" text-anchor="end">PRESS START</text></g><g fill="{color}" opacity=".75">{pixels}</g>''')

save('save-point.svg','''150|<rect x="1" y="1" width="1198" height="148" fill="#151623" rx="10" stroke="#39364f"/><g font-family="monospace" text-anchor="middle"><text x="600" y="51" fill="#a3ffbd" font-size="20" letter-spacing="4">✦ SAVE POINT REACHED ✦</text><text x="600" y="89" fill="#b4acc8" font-size="18">Build something. Learn something. Come back for another run.</text><text x="600" y="122" fill="#857b98" font-size="13">THANKS FOR STOPPING BY, PLAYER.</text></g>''')

readme=(ROOT/'README.md').read_text(encoding='utf-8')
body=re.sub(r'^### (.+)$',r'<h3>\1</h3>',readme,flags=re.M)
body=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',body)
body='\n\n'.join(f'<p>{block}</p>' if not block.lstrip().startswith('<') else block for block in body.split('\n\n'))
(ROOT/'preview.html').write_text('''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Prihandika / Arcade profile preview</title><style>*{box-sizing:border-box}body{margin:0;padding:30px 20px;background:#0d1117;color:#e6edf3;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1012px;margin:auto;padding:30px;border:1px solid #30363d;border-radius:8px}img{max-width:100%;vertical-align:middle}a{color:#a3ffbd;text-decoration:none}table{width:100%;border-collapse:collapse;table-layout:fixed}td{border:1px solid #30363d;padding:6px}h3{font-size:19px;margin:24px 0 16px}p{margin:16px 0}sub{color:#a9a0bc}@media(max-width:600px){body{padding:12px}main{padding:15px}td{padding:3px}}</style></head><body><main>'''+body+'</main></body></html>',encoding='utf-8')
for src in re.findall(r'src="(\./[^\"]+)"',readme):assert (ROOT/src).is_file(),src
with zipfile.ZipFile(ROOT/'github-profile-prhndk123.zip','w',zipfile.ZIP_DEFLATED) as archive:
    for file in [ROOT/'README.md',*sorted(ASSETS.glob('*')),*sorted((ROOT/'docs').glob('*'))]:archive.write(file,file.relative_to(ROOT))
print('Arcade assets, profile preview, and ZIP built. SVG XML and all local image references checked.')
