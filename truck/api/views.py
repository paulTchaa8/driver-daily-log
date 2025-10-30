from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RouteRequestSerializer
from .utils import geocode_place, get_route_osrm
import math
import time
from datetime import datetime, timedelta

METER_TO_MILE = 0.000621371

class RouteView(APIView):
	"""
	POST /api/route/
	Body: current_location, pickup_location, dropoff_location, current_cycle_hours
    """
	def post(self, request):
		ser = RouteRequestSerializer(data=request.data)
		if not ser.is_valid():
			return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
		data = ser.validated_data

		try:
			# geocode places
			cur_lat, cur_lon = geocode_place(data["current_location"])
			pu_lat, pu_lon = geocode_place(data["pickup_location"])
			do_lat, do_lon = geocode_place(data["dropoff_location"])
		except Exception as e:
			return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

		# Build locations list as (lat,lon)
		locations = [(cur_lat, cur_lon), (pu_lat, pu_lon), (do_lat, do_lon)]

		try:
			route_resp = get_route_osrm(locations)
		except Exception as e:
			return Response({"error": "Routing failed: " + str(e)}, status=status.HTTP_502_BAD_GATEWAY)

		# parse OSRM response
		routes = route_resp.get("routes") or []
		if not routes:
			return Response({"error": "No route found"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

		r0 = routes[0]
		distance_m = r0.get("distance", 0)  # meters
		duration_s = r0.get("duration", 0)  # seconds

		# add 1h for pickup and 1h for dropoff
		added_seconds = 2 * 3600
		total_seconds = duration_s + added_seconds
		total_miles = distance_m * METER_TO_MILE

		# compute fuel stops every 1000 miles
		miles_per_fuel = 1000
		fuel_stops = []
		if total_miles >= miles_per_fuel:
			n = int(total_miles // miles_per_fuel)
			for i in range(1, n + 1):
				fuel_stops.append({"mile": i * miles_per_fuel})

		# Simulate HOS: 11 hours driving per day
		driving_hours_per_day = 11
		remaining_seconds = total_seconds
		current_cycle_hours = float(data.get("current_cycle_hours", 0))
		# We'll assume start time = now
		start_time = datetime.utcnow()
		cursor_time = start_time
		eld_records = []
		day_index = 0

		# convert current_cycle_hours into seconds consumed today (only affects first day)
		while remaining_seconds > 0:
			# allowed driving seconds this day
			if day_index == 0:
				allowed_hours = max(0, driving_hours_per_day - current_cycle_hours)
			else:
				allowed_hours = driving_hours_per_day
			allowed_seconds = allowed_hours * 3600
			drive_seconds = min(remaining_seconds, allowed_seconds)
			# create day record
			record = {
				"day": day_index + 1,
				"start_time_utc": cursor_time.isoformat() + "Z",
				"drive_seconds": drive_seconds,
				"drive_hours": round(drive_seconds / 3600, 2),
			}
			eld_records.append(record)
			# advance time: driving + assume rest to next day (we'll just add drive_seconds + rest to next day start)
			cursor_time = cursor_time + timedelta(seconds=drive_seconds)
			# if still remaining, add rest until next day 00:00 of next day (simple + 13 hours of rest)
			remaining_seconds -= drive_seconds
			day_index += 1
			# set current_cycle_hours to 0 after first day
			current_cycle_hours = 0

		resp = {
			"route_summary": {
				"distance_meters": distance_m,
				"distance_miles": round(total_miles, 2),
				"duration_seconds": int(duration_s),
				"duration_with_stop_seconds": int(total_seconds),
			},
			"fuel_stops": fuel_stops,
			"eld_records": eld_records,
			"geojson_route": r0.get("geometry")  # geojson geometry (coordinates)
		}

		return Response(resp)