"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Atlas() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.9629, 20.5937], // India coords
      zoom: 4,
    });

    // Example marker
    new mapboxgl.Marker().setLngLat([77.209, 28.6139]).setPopup(
      new mapboxgl.Popup().setHTML("<h3>New Delhi</h3><p>Example forest location</p>")
    ).addTo(map.current);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Atlas</h2>
      <p className="text-gray-600 text-sm">
        Interactive maps for complaints, feedback, and scheme distribution.
      </p>

      <div ref={mapContainer} className="mt-6 w-full h-96 rounded-lg overflow-hidden" />
    </div>
  );
}
