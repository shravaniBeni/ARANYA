"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker issue
const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Atlas() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Atlas</h2>
      <p className="text-gray-600 text-sm">
        Interactive maps for complaints, feedback and scheme distribution.
      </p>

      <div className="mt-6 w-full h-[500px] rounded-lg overflow-hidden">
        <MapContainer
          center={[20.5937, 78.9629]} // Center India
          zoom={5}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Example Marker */}
          <Marker position={[28.6139, 77.209]}>
            <Popup>New Delhi</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
