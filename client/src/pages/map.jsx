import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../index.css";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const Map = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const dssRef = useRef(null);
  const demoRunningRef = useRef(false);

  // layer refs
  const villageLayerRef = useRef(null);
  const ifrLayerRef = useRef(null);
  const cfrLayerRef = useRef(null);
  const waterLayerRef = useRef(null);
  const farmLayerRef = useRef(null);
  const homeLayerRef = useRef(null);

  const computeDSSRef = useRef(null);

  // ------------------------
  // GeoJSON data
  // ------------------------
  const villageGeo = {
    type: "Feature",
    properties: { name: "Sukhpura" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.0, 22.0],
          [78.001, 22.0],
          [78.001, 22.001],
          [78.0, 22.001],
          [78.0, 22.0],
        ],
      ],
    },
  };

  const ifrGeo = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: "IFR-001",
          name: "Ramu K",
          area: "0.12 ha",
          status: "Granted",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [78.00015, 22.00015],
              [78.0003, 22.00015],
              [78.0003, 22.0003],
              [78.00015, 22.0003],
              [78.00015, 22.00015],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          id: "IFR-002",
          name: "Gita P",
          area: "0.08 ha",
          status: "Pending",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [78.00055, 22.00012],
              [78.00068, 22.00012],
              [78.00068, 22.00025],
              [78.00055, 22.00025],
              [78.00055, 22.00012],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: {
          id: "IFR-003",
          name: "Sunder S",
          area: "0.17 ha",
          status: "Granted",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [78.0002, 22.0006],
              [78.00045, 22.0006],
              [78.00045, 22.00085],
              [78.0002, 22.00085],
              [78.0002, 22.0006],
            ],
          ],
        },
      },
    ],
  };

  const cfrGeo = {
    type: "Feature",
    properties: { id: "CFR-001", name: "Sukhpura Community Forest" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [78.00002, 22.0007],
          [78.0009, 22.0007],
          [78.0009, 22.00098],
          [78.00002, 22.00098],
          [78.00002, 22.0007],
        ],
      ],
    },
  };

  const waterGeo = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { id: "W-01", type: "Pond" },
        geometry: { type: "Point", coordinates: [78.0008, 22.0004] },
      },
    ],
  };

  const farmsGeo = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { id: "F-01", owner: "Farm A" },
        geometry: { type: "Point", coordinates: [78.00025, 22.0005] },
      },
      {
        type: "Feature",
        properties: { id: "F-02", owner: "Farm B" },
        geometry: { type: "Point", coordinates: [78.0004, 22.00065] },
      },
      {
        type: "Feature",
        properties: { id: "F-03", owner: "Farm C" },
        geometry: { type: "Point", coordinates: [78.0007, 22.00055] },
      },
      {
        type: "Feature",
        properties: { id: "F-04", owner: "Farm D" },
        geometry: { type: "Point", coordinates: [78.0003, 22.00072] },
      },
    ],
  };

  const homesGeo = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { id: "H-01", resident: "Family X" },
        geometry: { type: "Point", coordinates: [78.0005, 22.00035] },
      },
      {
        type: "Feature",
        properties: { id: "H-02", resident: "Family Y" },
        geometry: { type: "Point", coordinates: [78.00022, 22.0004] },
      },
    ],
  };

  // ------------------------
  // Initialize map + layers
  // ------------------------
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, { zoomControl: true }).setView(
      [22.0005, 78.0005],
      17
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    villageLayerRef.current = L.geoJSON(villageGeo, {
      style: { color: "#444", weight: 2, fill: false },
    }).addTo(map);

    const ifrStyle = (feature) => ({
      color: feature.properties.status === "Granted" ? "#2e7d32" : "#f39c12",
      weight: 1,
      fillOpacity: 0.35,
    });

    ifrLayerRef.current = L.geoJSON(ifrGeo, {
      style: ifrStyle,
      onEachFeature: function (feature, layer) {
        const p = feature.properties;
        const html = `<b>Claimant:</b> ${p.name}<br><b>ID:</b> ${p.id}<br><b>Area:</b> ${p.area}<br><b>Status:</b> ${p.status}<br><br><a href='#' onclick="alert('Pretend: open scanned document for ${p.name}')">View scanned record</a>`;
        layer.bindPopup(html);
        layer.on("mouseover", () => layer.setStyle({ weight: 3 }));
        layer.on("mouseout", () => layer.setStyle(ifrStyle(feature)));
      },
    });

    cfrLayerRef.current = L.geoJSON(cfrGeo, {
      style: {
        color: "#1e90ff",
        fillColor: "#e8f5ff",
        weight: 1,
        fillOpacity: 0.12,
      },
      onEachFeature: (f, l) => l.bindPopup(`<b>${f.properties.name}</b> (CFR)`),
    });

    waterLayerRef.current = L.geoJSON(waterGeo, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#0066cc",
          color: "#0066cc",
          weight: 1,
          fillOpacity: 0.9,
        }).bindPopup(
          `<b>Water:</b> ${feature.properties.type} (${feature.properties.id})`
        ),
    });

    farmLayerRef.current = L.geoJSON(farmsGeo, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#9b59b6",
          color: "#7a3fa6",
          weight: 1,
          fillOpacity: 0.9,
        }).bindPopup(
          `<b>Farm:</b> ${feature.properties.owner || feature.properties.id}`
        ),
    });

    homeLayerRef.current = L.geoJSON(homesGeo, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 5,
          fillColor: "#ffd166",
          color: "#cc9b35",
          weight: 1,
          fillOpacity: 0.95,
        }).bindPopup(`<b>Home:</b> ${feature.properties.resident}`),
    });

    const overlays = {
      "IFR plots": ifrLayerRef.current,
      "CFR areas": cfrLayerRef.current,
      "Water bodies (AI)": waterLayerRef.current,
      "Farms (AI)": farmLayerRef.current,
      Homesteads: homeLayerRef.current,
    };

    L.control.layers({}, overlays, { collapsed: false }).addTo(map);
    L.control.scale({ position: "bottomright" }).addTo(map);

    // computeDSS
    const computeDSS = () => {
      const farmCount = farmsGeo.features.length;
      const waterCount = waterGeo.features.length;
      let priority = "LOW";
      if (farmCount >= 3 && waterCount <= 1) priority = "HIGH";
      else if (farmCount >= 1 && waterCount <= 2) priority = "MEDIUM";

      const color =
        priority === "HIGH"
          ? "#b91c1c"
          : priority === "MEDIUM"
          ? "#b45309"
          : "#065f46";
      const msg = `<strong>DSS Priority:</strong> <span style='color:${color}; font-weight:600'>${priority}</span><br>Farms: ${farmCount}<br>Water sources: ${waterCount}`;

      if (dssRef.current) dssRef.current.innerHTML = msg;

      if (villageLayerRef.current) {
        villageLayerRef.current.setStyle({
          color:
            priority === "HIGH"
              ? "#b91c1c"
              : priority === "MEDIUM"
              ? "#b45309"
              : "#444",
          weight: priority === "LOW" ? 2 : 3,
          fillOpacity: priority === "LOW" ? 0 : 0.02,
        });
      }

      return { priority, farmCount, waterCount };
    };

    computeDSSRef.current = computeDSS;
    map.on(
      "overlayadd overlayremove",
      () => computeDSSRef.current && computeDSSRef.current()
    );
    computeDSS();
    setTimeout(() => map.invalidateSize({ animate: true }), 100);

    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const demoSequence = async () => {
    if (demoRunningRef.current) return;
    const map = mapRef.current;
    if (!map) return;
    demoRunningRef.current = true;

    try {
      [
        ifrLayerRef,
        cfrLayerRef,
        waterLayerRef,
        farmLayerRef,
        homeLayerRef,
      ].forEach((ref) => {
        if (map.hasLayer(ref.current)) map.removeLayer(ref.current);
      });
    } catch {}

    ifrLayerRef.current?.addTo(map);
    await sleep(900);

    const fLayers = ifrLayerRef.current?.getLayers?.() || [];
    if (fLayers.length) {
      try {
        map.fitBounds(fLayers[0].getBounds(), { maxZoom: 18 });
      } catch {}
      fLayers[0].openPopup();
    }

    await sleep(1400);
    cfrLayerRef.current?.addTo(map);
    await sleep(1000);
    waterLayerRef.current?.addTo(map);
    await sleep(900);
    farmLayerRef.current?.addTo(map);
    homeLayerRef.current?.addTo(map);
    await sleep(600);

    computeDSSRef.current && computeDSSRef.current();

    try {
      map.fitBounds(villageLayerRef.current.getBounds(), { padding: [50, 50] });
    } catch {}

    demoRunningRef.current = false;
  };

  return (
    <div className="relative h-screen w-full font-sans">
      <div ref={mapContainerRef} id="map" className="h-full w-full z-30" />

      <div className="absolute top-3 left-3 z-30 bg-white/95 p-4 rounded-lg shadow-xl w-72">
        <h3 className="text-lg font-semibold">
          FRA Atlas — <em>Sukhpura</em>
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Interactive prototype showing: IFR, CFR, AI-mapped assets & DSS
          flagging.
        </p>

        <button
          onClick={demoSequence}
          className="mt-3 px-3 py-2 bg-blue-600 text-white rounded-md text-sm cursor-pointer"
        >
          ▶ Run Demo
        </button>

        <div
          ref={dssRef}
          id="dssResult"
          className="mt-3 p-2 bg-gray-100 rounded-md text-sm"
        >
          <strong>DSS:</strong> Run demo or toggle layers to compute priority.
        </div>

        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-gray-700" /> Village Boundary
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-green-700" /> IFR plots
            (Granted)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-yellow-500" /> IFR plots
            (Pending)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-blue-600" /> Water bodies
            (AI-mapped)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-purple-600" /> Farms
            (AI-mapped)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-sky-500" /> CFR (Community
            Forest)
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-3 z-[1001] bg-white/90 px-3 py-2 rounded-md text-xs">
        Tip: Use the layer control (top-right) to toggle layers. Click an IFR
        polygon to view digitized details.
      </div>
    </div>
  );
};

export default Map;
