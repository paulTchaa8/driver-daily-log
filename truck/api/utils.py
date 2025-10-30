import requests
from urllib.parse import urlencode

USER_AGENT = "driver-eld-assessment/1.0 (paultchaa@gmail.com)"

def geocode_place(place):
	"""
	Utilise Nominatim (OpenStreetMap) pour transformer une adresse/lieu en (lat, lon).
	Retourne (lat, lon) floats.
	"""
	url = "https://nominatim.openstreetmap.org/search"
	params = {"q": place, "format": "json", "limit": 1}
	headers = {"User-Agent": USER_AGENT}
	r = requests.get(url, params=params, headers=headers, timeout=10)
	r.raise_for_status()
	data = r.json()
	if not data:
	    raise ValueError(f"Geocoding failed for: {place}")
	lat = float(data[0]["lat"])
	lon = float(data[0]["lon"])
	return lat, lon

def get_route_osrm(locations):
    """
    locations: list of (lat, lon) tuples in order.
    Utilise OSRM public demo server pour calculer la route.
    Renvoie le JSON de réponse (routes[0] etc.).
    NOTE: OSRM public demo can be unreliable for heavy usage. For production,
    use your own OSRM instance or ORS.
    """
    # Build coord string: lon,lat;lon,lat;...
    coord_str = ";".join(f"{lon},{lat}" for lat, lon in locations)
    url = f"http://router.project-osrm.org/route/v1/driving/{coord_str}"
    params = {"overview": "full", "geometries": "geojson", "steps": "false"}
    r = requests.get(url, params=params, timeout=20)
    r.raise_for_status()
    return r.json()
