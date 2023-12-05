// App.js
import React from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import YOLOComponent from './YOLO';
import logo from './logo.png';

function App() {
  const [mapCenter] = React.useState([51.505, -0.09]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pothole Map</h1>
        <YOLOComponent /> {/* Render the YOLOComponent here */}
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
                <p>Low Danger</p>
                <img src={logo} width={100} height={100} alt="react logo" />
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </header>
    </div>
  );
}

export default App;
