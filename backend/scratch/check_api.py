import urllib.request
import json

def test_api():
    base_url = "http://localhost:8000/search-properties"
    
    # 1. Test featured=true
    req_featured = urllib.request.Request(f"{base_url}?featured=true")
    try:
        with urllib.request.urlopen(req_featured) as response:
            data = json.loads(response.read())
            print(f"GET /search-properties?featured=true returned {len(data)} items:")
            for item in data:
                print(f"- {item.get('name')}: featured={item.get('featured')}")
    except Exception as e:
        print(f"Error testing featured API: {e}")

    # 2. Test unfiltered
    req_all = urllib.request.Request(base_url)
    try:
        with urllib.request.urlopen(req_all) as response:
            data = json.loads(response.read())
            print(f"\nGET /search-properties (unfiltered) returned {len(data)} items:")
            for item in data:
                print(f"- {item.get('name')}: featured={item.get('featured')}")
    except Exception as e:
        print(f"Error testing all API: {e}")

if __name__ == "__main__":
    test_api()
