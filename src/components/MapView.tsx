// @ts-ignore
import 'leaflet/dist/leaflet.css'
import React, { useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { Card } from 'react-bootstrap'

interface MapViewProps {
  geojson: any
  summary: any
}

const MapView: React.FC<MapViewProps> = ({ geojson, summary }) => {
  useEffect(() => {
    console.log('GeoJSON data:', geojson)
  }, [geojson])

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>Trip Route</Card.Header>
      <Card.Body>
        <div style={{ height: '300px' }}>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[39.5, -98.35]}
            zoom={5}
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
  )
}

export default MapView