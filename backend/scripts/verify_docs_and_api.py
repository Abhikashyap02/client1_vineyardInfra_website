import sys
import os

# Adjust search path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_all():
    print("==================================================")
    print("Testing Documentation and API Routes")
    print("==================================================")

    # 1. Test /docs
    docs_resp = client.get("/docs")
    print(f"GET /docs status: {docs_resp.status_code}")
    assert docs_resp.status_code == 200, f"Expected 200 for /docs, got {docs_resp.status_code}"
    assert "swagger-ui" in docs_resp.text.lower(), "Swagger UI not found in /docs response"
    print("  -> /docs returned Swagger UI HTML successfully.")
    print(f"  -> CSP Header on /docs: {docs_resp.headers.get('content-security-policy')}")

    # 2. Test /redoc
    redoc_resp = client.get("/redoc")
    print(f"GET /redoc status: {redoc_resp.status_code}")
    assert redoc_resp.status_code == 200, f"Expected 200 for /redoc, got {redoc_resp.status_code}"
    assert "redoc" in redoc_resp.text.lower(), "ReDoc not found in /redoc response"
    print("  -> /redoc returned ReDoc HTML successfully.")

    # 3. Test /openapi.json
    openapi_resp = client.get("/openapi.json")
    print(f"GET /openapi.json status: {openapi_resp.status_code}")
    assert openapi_resp.status_code == 200, f"Expected 200 for /openapi.json, got {openapi_resp.status_code}"
    openapi_data = openapi_resp.json()
    assert openapi_data.get("openapi"), "Missing openapi version in schema"
    assert openapi_data["info"]["title"] == "Vineyard Infra API", f"Unexpected title: {openapi_data['info']['title']}"
    paths = list(openapi_data.get("paths", {}).keys())
    print(f"  -> OpenAPI Paths count: {len(paths)}")
    print(f"  -> Documented paths: {paths}")
    assert "/search-properties" in paths
    assert "/properties/{slug}" in paths
    assert "/locations" in paths
    assert "/property-options" in paths
    assert "/create-lead" in paths
    assert "/book-visit" in paths
    assert "/appointments" in paths
    assert "/faqs" in paths
    assert "/banners" in paths

    # 4. Test Root Endpoint
    root_resp = client.get("/")
    print(f"GET / status: {root_resp.status_code}, data: {root_resp.json()}")
    assert root_resp.status_code == 200
    print(f"  -> CSP Header on /: {root_resp.headers.get('content-security-policy')}")

    # 5. Test CORS Headers
    cors_resp = client.options(
        "/search-properties",
        headers={
            "Origin": "https://vineyardinfra.in",
            "Access-Control-Request-Method": "GET",
        }
    )
    print(f"OPTIONS /search-properties (Origin: https://vineyardinfra.in) status: {cors_resp.status_code}")
    print(f"  -> Access-Control-Allow-Origin: {cors_resp.headers.get('access-control-allow-origin')}")
    assert cors_resp.headers.get("access-control-allow-origin") == "https://vineyardinfra.in"

    cors_www_resp = client.options(
        "/search-properties",
        headers={
            "Origin": "https://www.vineyardinfra.in",
            "Access-Control-Request-Method": "GET",
        }
    )
    print(f"OPTIONS /search-properties (Origin: https://www.vineyardinfra.in) status: {cors_www_resp.status_code}")
    print(f"  -> Access-Control-Allow-Origin: {cors_www_resp.headers.get('access-control-allow-origin')}")
    assert cors_www_resp.headers.get("access-control-allow-origin") == "https://www.vineyardinfra.in"

    # 6. Test Data Endpoints
    prop_resp = client.get("/search-properties")
    print(f"GET /search-properties status: {prop_resp.status_code}, count: {len(prop_resp.json())}")
    assert prop_resp.status_code == 200

    loc_resp = client.get("/locations")
    print(f"GET /locations status: {loc_resp.status_code}, locations: {loc_resp.json()}")
    assert loc_resp.status_code == 200

    opt_resp = client.get("/property-options")
    print(f"GET /property-options status: {opt_resp.status_code}, options count: {len(opt_resp.json())}")
    assert opt_resp.status_code == 200

    faq_resp = client.get("/faqs")
    print(f"GET /faqs status: {faq_resp.status_code}, faqs count: {len(faq_resp.json())}")
    assert faq_resp.status_code == 200

    banner_resp = client.get("/banners")
    print(f"GET /banners status: {banner_resp.status_code}, banner count: {len(banner_resp.json())}")
    assert banner_resp.status_code == 200

    print("\n[SUCCESS] All documentation, CORS, and endpoint tests passed cleanly!")
    print("==================================================")

if __name__ == "__main__":
    test_all()
