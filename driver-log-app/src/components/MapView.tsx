// @ts-ignore
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { Card, Spinner } from 'react-bootstrap';

interface MapViewProps {
  geojson: any;
  summary: any;
}

const MapView: React.FC<MapViewProps> = ({ geojson, summary }) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('GeoJSON data:', geojson);

    // Tenter de récupérer la position du navigateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        (err) => {
          console.warn('Impossible de récupérer la localisation:', err.message);
          // Valeur par défaut (centre des US si refus)
          setUserPosition([39.5, -98.35]);
          setLoading(false);
        }
      );
    } else {
      console.warn("La géolocalisation n'est pas supportée par ce navigateur.");
      setUserPosition([39.5, -98.35]);
      setLoading(false);
    }
  }, [geojson]);

  if (loading) {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Header>Trip Route</Card.Header>
        <Card.Body className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Chargement de la carte...</span>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>Trip Route</Card.Header>
      <Card.Body>
        <div style={{ height: '300px' }}>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={userPosition || [39.5, -98.35]}
            zoom={6}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geojson && <GeoJSON data={geojson} />}
          </MapContainer>
        </div>
        {summary && (
          <p className="mt-3">
            <strong>Distance:</strong> {summary.distance_miles.toFixed(2)} miles <br />
            <strong>Duration:</strong> {(summary.duration_seconds / 3600).toFixed(2)} hours
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default MapView;
