// @ts-ignore
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { Card, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface MapViewProps {
  geojson: any;
  summary: any;
}

const MapView: React.FC<MapViewProps> = ({ geojson, summary }) => {
  const { t } = useTranslation();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        (err) => {
          console.warn('Cannot get location:', err.message);
          setUserPosition([39.5, -98.35]);
          setLoading(false);
        }
      );
    } else {
      console.warn("Geolocation not supported");
      setUserPosition([39.5, -98.35]);
      setLoading(false);
    }
  }, [geojson]);

  if (loading) {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Header>{t('MAP_VIEW.CARD_HEADER')}</Card.Header>
        <Card.Body className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">{t('MAP_VIEW.LOADING')}</span>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>{t('MAP_VIEW.CARD_HEADER')}</Card.Header>
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
            <strong>{t('MAP_VIEW.DISTANCE')}:</strong> {summary.distance_miles.toFixed(2)} miles <br />
            <strong>{t('MAP_VIEW.DURATION')}:</strong> {(summary.duration_seconds / 3600).toFixed(2)} hours
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default MapView;
