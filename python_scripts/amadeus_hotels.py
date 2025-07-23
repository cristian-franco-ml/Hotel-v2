import os
import requests
from dotenv import load_dotenv
import sys

load_dotenv()

AMADEUS_API_KEY = os.getenv('AMADEUS_API_KEY')
AMADEUS_API_SECRET = os.getenv('AMADEUS_API_SECRET')

# Obtener token de acceso de Amadeus

def get_amadeus_token():
    url = 'https://test.api.amadeus.com/v1/security/oauth2/token'
    data = {
        'grant_type': 'client_credentials',
        'client_id': AMADEUS_API_KEY,
        'client_secret': AMADEUS_API_SECRET
    }
    response = requests.post(url, data=data)
    response.raise_for_status()
    return response.json()['access_token']

# Buscar hoteles cercanos

def search_hotels(lat, lng, radius_km, keyword=None):
    try:
        token = get_amadeus_token()
        url = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode'
        params = {
            'latitude': lat,
            'longitude': lng,
            'radius': radius_km,
            'radiusUnit': 'KM',
            'hotelSource': 'ALL',
            'page[limit]': 20
        }
        if keyword:
            params['keyword'] = keyword
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = requests.get(url, params=params, headers=headers)
        if response.status_code != 200:
            # Si la API responde con error, devolver lista vacía
            print("Token:", token)
            print("URL:", url)
            print("Params:", params)
            print("Headers:", headers)
            print("Status code:", response.status_code)
            print("Response text:", response.text)
            return []
            
        hotels = response.json().get('data', [])
        # Extraer campos relevantes
        result = []
        for h in hotels:
            info = h.get('hotel', {})
            result.append({
                'id': info.get('hotelId'),
                'name': info.get('name'),
                'latitude': info.get('latitude'),
                'longitude': info.get('longitude'),
                'address': info.get('address', {}).get('lines', []),
                'city': info.get('address', {}).get('cityName'),
                'country': info.get('address', {}).get('countryCode'),
            })
        return result
    except Exception as e:
        # Si ocurre cualquier excepción, devolver lista vacía
        return []

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--lat', type=float, required=True)
    parser.add_argument('--lng', type=float, required=True)
    parser.add_argument('--radius', type=int, default=15)
    parser.add_argument('--keyword', type=str, default=None)
    args = parser.parse_args()
    try:
        hotels = search_hotels(args.lat, args.lng, args.radius, args.keyword)
        import json
        print(json.dumps(hotels, ensure_ascii=False, indent=2))
    except Exception as e:
        print(f'Error: {e}', file=sys.stderr)
        sys.exit(1) 