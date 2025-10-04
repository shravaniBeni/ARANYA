import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../index.css";

// MapComponent.tsx
// Converted from your HTML prototype to a typed React + Tailwind component.
// - Demo playback (Run Demo) is implemented and wired to the button (async sequence)
// - Uses refs so Leaflet objects are accessible from the demo function
// - computeDSS updates the on-screen box and highlights the village polygon

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const dssRef = useRef<HTMLDivElement | null>(null);
  const demoRunningRef = useRef(false);

  // layer refs
  const villageLayerRef = useRef<L.GeoJSON | null>(null);
  const ifrLayerRef = useRef<L.GeoJSON | null>(null);
  const cfrLayerRef = useRef<L.GeoJSON | null>(null);
  const waterLayerRef = useRef<L.GeoJSON | null>(null);
  const farmLayerRef = useRef<L.GeoJSON | null>(null);
  const homeLayerRef = useRef<L.GeoJSON | null>(null);

  // function ref so both map event listeners and demoSequence can call it
  const computeDSSRef = useRef<
    (() => { priority: string; farmCount: number; waterCount: number }) | null
  >(null);

  // ------------------------
  // GeoJSON data (kept same as your HTML)
  // ------------------------
  const villageGeo: any = {
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

  const ifrGeo: any = {
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

  const cfrGeo: any = {
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

  const waterGeo: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { id: "W-01", type: "Pond" },
        geometry: { type: "Point", coordinates: [78.0008, 22.0004] },
      },
    ],
  };

  const farmsGeo: any = {
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

  const homesGeo: any = {
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
  // Initialize map + layers inside effect
  // ------------------------
  useEffect(() => {
    if (mapRef.current) return;
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, { zoomControl: true }).setView(
      [22.0005, 78.0005],
      17
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // village
    villageLayerRef.current = L.geoJSON(villageGeo as any, {
      style: { color: "#444", weight: 2, fill: false },
    }).addTo(map);

    // IFR style fn
    function ifrStyle(feature: any) {
      return {
        color: feature.properties.status === "Granted" ? "#2e7d32" : "#f39c12",
        weight: 1,
        fillOpacity: 0.35,
      };
    }

    ifrLayerRef.current = L.geoJSON(ifrGeo as any, {
      style: ifrStyle as any,
      onEachFeature: function (feature: any, layer: any) {
        const p = feature.properties;
        const html = `<b>Claimant:</b> ${p.name}<br><b>ID:</b> ${p.id}<br><b>Area:</b> ${p.area}<br><b>Status:</b> ${p.status}<br><br><a href='#' onclick=\"alert('Pretend: open scanned document for ${p.name}')\">View scanned record</a>`;
        layer.bindPopup(html);
        layer.on("mouseover", function () {
          layer.setStyle({ weight: 3 });
        });
        layer.on("mouseout", function () {
          layer.setStyle(ifrStyle(feature));
        });
      },
    }); // trick to keep ts happy

    // Note: .notAddToMap isn't real — below we set the ref properly
    ifrLayerRef.current = L.geoJSON(ifrGeo as any, {
      style: ifrStyle as any,
      onEachFeature: function (feature: any, layer: any) {
        const p = feature.properties;
        const html = `<b>Claimant:</b> ${p.name}<br><b>ID:</b> ${p.id}<br><b>Area:</b> ${p.area}<br><b>Status:</b> ${p.status}<br><br><a href='#' onclick=\"alert('Pretend: open scanned document for ${p.name}')\">View scanned record</a>`;
        layer.bindPopup(html);
        layer.on("mouseover", function () {
          layer.setStyle({ weight: 3 });
        });
        layer.on("mouseout", function () {
          layer.setStyle(ifrStyle(feature));
        });
      },
    });

    cfrLayerRef.current = L.geoJSON(cfrGeo as any, {
      style: {
        color: "#1e90ff",
        fillColor: "#e8f5ff",
        weight: 1,
        fillOpacity: 0.12,
      },
      onEachFeature: function (f: any, l: any) {
        l.bindPopup(`<b>${f.properties.name}</b> (CFR)`);
      },
    });

    waterLayerRef.current = L.geoJSON(waterGeo as any, {
      pointToLayer: function (feature: any, latlng: L.LatLng) {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#0066cc",
          color: "#0066cc",
          weight: 1,
          fillOpacity: 0.9,
        }).bindPopup(
          `<b>Water:</b> ${feature.properties.type} (${feature.properties.id})`
        );
      },
    });

    farmLayerRef.current = L.geoJSON(farmsGeo as any, {
      pointToLayer: function (feature: any, latlng: L.LatLng) {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#9b59b6",
          color: "#7a3fa6",
          weight: 1,
          fillOpacity: 0.9,
        }).bindPopup(
          `<b>Farm:</b> ${feature.properties.owner || feature.properties.id}`
        );
      },
    });

    homeLayerRef.current = L.geoJSON(homesGeo as any, {
      pointToLayer: function (feature: any, latlng: L.LatLng) {
        return L.circleMarker(latlng, {
          radius: 5,
          fillColor: "#ffd166",
          color: "#cc9b35",
          weight: 1,
          fillOpacity: 0.95,
        }).bindPopup(`<b>Home:</b> ${feature.properties.resident}`);
      },
    });

    // Layer control — overlays
    const overlays: any = {
      "IFR plots": ifrLayerRef.current,
      "CFR areas": cfrLayerRef.current,
      "Water bodies (AI)": waterLayerRef.current,
      "Farms (AI)": farmLayerRef.current,
      Homesteads: homeLayerRef.current,
    };

    L.control.layers({}, overlays, { collapsed: false }).addTo(map);

    // Scale
    L.control.scale({ position: "bottomright" }).addTo(map);

    // computeDSS implementation
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

      // visual cue on map
      if (villageLayerRef.current) {
        if (priority === "HIGH") {
          villageLayerRef.current.setStyle({
            color: "#b91c1c",
            weight: 3,
            fillOpacity: 0.02,
          });
        } else if (priority === "MEDIUM") {
          villageLayerRef.current.setStyle({
            color: "#b45309",
            weight: 3,
            fillOpacity: 0.02,
          });
        } else {
          villageLayerRef.current.setStyle({
            color: "#444",
            weight: 2,
            fillOpacity: 0,
          });
        }
      }

      return { priority, farmCount, waterCount };
    };

    computeDSSRef.current = computeDSS;

    // recompute on overlay toggle
    map.on("overlayadd overlayremove", () => {
      computeDSSRef.current && computeDSSRef.current();
    });

    // run initial compute
    computeDSS();

    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    // helper to open first IFR from console
    (window as any).openFirstIFR = function () {
      const l = ifrLayerRef.current?.getLayers();
      if (l?.length) {
        const firstLayer = l[0] as L.Polygon; // cast to polygon
        firstLayer.openPopup();
        mapRef.current?.fitBounds(firstLayer.getBounds());
      }
    };

    // cleanup
    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ------------------------
  // Demo sequence uses refs created above
  // ------------------------
  const demoSequence = async () => {
    if (demoRunningRef.current) return;
    const map = mapRef.current;
    if (!map) return;
    demoRunningRef.current = true;

    // remove layers if present
    try {
      if (map.hasLayer(ifrLayerRef.current as any))
        map.removeLayer(ifrLayerRef.current as any);
      if (map.hasLayer(cfrLayerRef.current as any))
        map.removeLayer(cfrLayerRef.current as any);
      if (map.hasLayer(waterLayerRef.current as any))
        map.removeLayer(waterLayerRef.current as any);
      if (map.hasLayer(farmLayerRef.current as any))
        map.removeLayer(farmLayerRef.current as any);
      if (map.hasLayer(homeLayerRef.current as any))
        map.removeLayer(homeLayerRef.current as any);
    } catch (e) {
      /* ignore */
    }

    // 1 - Toggle IFR plots
    ifrLayerRef.current?.addTo(map);
    await sleep(900);

    // open first IFR popup and zoom to it
    const fLayers = (ifrLayerRef.current as any)?.getLayers?.() || [];
    if (fLayers.length) {
      try {
        map.fitBounds(fLayers[0].getBounds(), { maxZoom: 18 });
      } catch (e) {}
      fLayers[0].openPopup();
    }

    await sleep(1400);

    // 2 - Toggle CFR
    cfrLayerRef.current?.addTo(map);
    await sleep(1000);

    // 3 - Toggle water bodies
    waterLayerRef.current?.addTo(map);
    await sleep(900);

    // 4 - Toggle farms and homes
    farmLayerRef.current?.addTo(map);
    homeLayerRef.current?.addTo(map);
    await sleep(600);

    // 5 - Compute DSS and highlight
    computeDSSRef.current && computeDSSRef.current();

    // Pan back to village overview
    try {
      map.fitBounds((villageLayerRef.current as any).getBounds(), {
        padding: [50, 50],
      });
    } catch (e) {}

    demoRunningRef.current = false;
  };

  return (
    <div className="relative h-screen w-full font-sans">
      <div ref={mapContainerRef} id="map" className="h-full w-full" />

      {/* Sidebar */}
      <div className="absolute top-3 left-3 z-[1001] bg-white/95 p-4 rounded-lg shadow-xl w-72">
        <h3 className="text-lg font-semibold">
          FRA Atlas — <em>Sukhpura</em>
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Interactive prototype showing: IFR, CFR, AI-mapped assets & DSS
          flagging.
        </p>

        <button
          onClick={demoSequence}
          className="mt-3 px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
        >
          ▶ Run Demo
        </button>

        <div
          ref={dssRef}
          id="dssResult"
          className="mt-3 p-2 bg-gray-100 rounded-md text-sm"
        >
          {" "}
          <strong>DSS:</strong> Run demo or toggle layers to compute priority.{" "}
        </div>

        {/* Legend */}
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-gray-700" />
            Village Boundary
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-green-700" />
            IFR plots (Granted)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-yellow-500" />
            IFR plots (Pending)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-blue-600" />
            Water bodies (AI-mapped)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-purple-600" />
            Farms (AI-mapped)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-3 rounded-sm bg-sky-500" />
            CFR (Community Forest)
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-2 left-3 z-[1001] bg-white/90 px-3 py-2 rounded-md text-xs">
        Tip: Use the layer control (top-right) to toggle layers. Click an IFR
        polygon to view digitized details.
      </div>
    </div>
  );
};

export default MapComponent;
