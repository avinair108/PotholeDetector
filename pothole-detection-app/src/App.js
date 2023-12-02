import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

function App() {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [markers, setMarkers] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // You can perform additional tasks with the uploaded file if needed
      console.log('Uploaded file:', file);
    }
  };

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setMarkers([...markers, { lat, lng }]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pothole Map</h1>
        <input type="file" onChange={handleFileUpload} />
        <div style={{ height: '500px' }}>
          <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={mapCenter}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker
              position={[52.0, -1.0]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>New popup for testing</Popup>
            </Marker>
          </MapContainer>
        </div>
      </header>
    </div>
  );
}

export default App;
