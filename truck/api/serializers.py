from rest_framework import serializers

class RouteRequestSerializer(serializers.Serializer):
	current_location = serializers.CharField()
	pickup_location = serializers.CharField()
	dropoff_location = serializers.CharField()
	current_cycle_hours = serializers.FloatField()  # ex: 12.5