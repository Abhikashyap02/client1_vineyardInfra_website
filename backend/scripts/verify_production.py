import urllib.request
import urllib.parse
import json

BASE = 'https://api.vineyardinfra.in'

def test(url, name, expected_code=200):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=15)
        body = res.read()
        print(f'PASS: [{res.status}] {name} ({url}) - {len(body)} bytes')
        return res, body
    except Exception as e:
        print(f'FAIL: {name} ({url}) - Error: {e}')
        return None, None

def run():
    print('==================================================')
    print('VERIFYING PRODUCTION DEPLOYMENT: ' + BASE)
    print('==================================================')
    
    # 1. Docs and Schema
    test(f'{BASE}/docs', 'Swagger UI Docs')
    test(f'{BASE}/redoc', 'ReDoc Docs')
    _, openapi_body = test(f'{BASE}/openapi.json', 'OpenAPI Schema')
    if openapi_body:
        data = json.loads(openapi_body.decode())
        print(f'  OpenAPI Title: {data.get("info", {}).get("title")}')
        print(f'  OpenAPI Version: {data.get("info", {}).get("version")}')
        paths = list(data.get("paths", {}).keys())
        print(f'  Documented Routes ({len(paths)}): {paths}')

    # 2. Endpoints
    test(f'{BASE}/', 'Root / Health')
    test(f'{BASE}/search-properties', 'Property Search')
    test(f'{BASE}/properties/vivanta-greens', 'Property Detail by slug')
    test(f'{BASE}/locations', 'Locations List')
    test(f'{BASE}/property-options', 'Property Options')
    test(f'{BASE}/faqs', 'FAQs List')
    test(f'{BASE}/banners', 'Banners List')

    # 3. CORS
    print('\n=== VERIFYING PRODUCTION CORS HEADERS ===')
    for origin in ['https://vineyardinfra.in', 'https://www.vineyardinfra.in']:
        req = urllib.request.Request(
            f'{BASE}/search-properties',
            headers={
                'Origin': origin,
                'Access-Control-Request-Method': 'GET',
                'User-Agent': 'Mozilla/5.0'
            },
            method='OPTIONS'
        )
        try:
            res = urllib.request.urlopen(req, timeout=15)
            allow_origin = res.headers.get('access-control-allow-origin')
            print(f'CORS {origin} -> Access-Control-Allow-Origin: {allow_origin} (Status: {res.status})')
        except Exception as e:
            print(f'CORS FAIL for {origin}: {e}')
    
    print('==================================================')

if __name__ == '__main__':
    run()
