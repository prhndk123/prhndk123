"""Use the existing Git credential in memory to manage this profile repository."""
import json
import subprocess
import sys
import urllib.request
import urllib.error

method, path = sys.argv[1:3]
if not path.startswith('/repos/prhndk123/prhndk123/'):
    raise SystemExit('Only this profile repository is supported.')
credential = subprocess.run(
    ['git', 'credential', 'fill'], input='protocol=https\nhost=github.com\n\n',
    text=True, capture_output=True, check=True,
).stdout
fields = dict(line.split('=', 1) for line in credential.splitlines() if '=' in line)
token = fields.get('password')
if not token:
    raise SystemExit('No existing Git credential available.')
payload = sys.argv[3].encode() if len(sys.argv) > 3 else None
req = urllib.request.Request('https://api.github.com' + path, data=payload, method=method,
    headers={'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json',
             'Content-Type': 'application/json', 'User-Agent': 'profile-arcade-setup'})
try:
    with urllib.request.urlopen(req, timeout=30) as response:
        result = response.read().decode()
        print(result or json.dumps({'status': response.status}))
except urllib.error.HTTPError as error:
    print(json.dumps({'status': error.code, 'message': json.loads(error.read()).get('message')}))
    sys.exit(1)
