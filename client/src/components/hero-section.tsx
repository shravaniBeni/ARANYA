import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import type { Map, MapLayerMouseEvent } from "mapbox-gl";
import styles from "../styles/HeroSection.module.scss";

const HeroSection = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic3RldmllZ3JpZmZpbmRlc2lnbiIsImEiOiJja24waTQzeHYwbndvMnZtbnFrYXV3ZjdjIn0.zhhJzykz0VYq7RQWBJxh7A";

    const map: Map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/steviegriffindesign/clehjyzbi001k01s201eihjqn",
      projection: "globe",
      zoom: 1.5,
      center: [1.6889271, 31.7091206],
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on("style.load", () => {
      map.setFog({
        color: "rgba(0, 102, 255, 0.4)",
        "high-color": "rgba(0, 102, 255, 0.1)",
        "horizon-blend": 0.04,
        "space-color": "rgba(0,0,0,0)",
        "star-intensity": 0.0,
      });

      map.setPaintProperty("water", "fill-color", "#102EB9");
      map.setPaintProperty("water", "fill-opacity", 1);

      const layers = map.getStyle().layers || [];
      for (const layer of layers) {
        if (layer.id.includes("label")) {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      }

      map.addSource("countries", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
        generateId: true,
      });

      map.addLayer({
        id: "country-fills",
        type: "fill",
        source: "countries",
        layout: {},
        paint: {
          "fill-color": [
            "case",
            ["==", ["get", "name"], "India"],
            "#047857",
            ["boolean", ["feature-state", "guessed"], false],
            "#FF4136",
            ["boolean", ["feature-state", "hover"], false],
            "rgba(10, 30, 44, 0.9)",
            "#A8C7FF",
          ],
          "fill-opacity": 1,
        },
      });

      map.addLayer({
        id: "country-borders",
        type: "line",
        source: "countries",
        layout: {},
        paint: {
          "line-color": "#fff",
          "line-width": 0.0,
        },
      });

      map.addLayer(
        {
          id: "globe-gradient",
          type: "background",
          paint: {
            "background-color": "#001F9E",
            "background-pattern":
              "radial-gradient(circle at center, #A8C7FF 0%, #001F9E 80%)",
          },
        },
        "water"
      );

      let hoveredCountryId: string | number | undefined = undefined;

      map.on(
        "mousemove",
        "country-fills",
        (
          e: MapLayerMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }
        ) => {
          if (e.features && e.features.length > 0) {
            if (hoveredCountryId !== undefined) {
              map.setFeatureState(
                { source: "countries", id: hoveredCountryId },
                { hover: false }
              );
            }

            hoveredCountryId = e.features[0].id as string | number | undefined;
            map.setFeatureState(
              {
                source: "countries",
                id: hoveredCountryId,
              } as mapboxgl.MapboxGeoJSONFeature,
              { hover: true }
            );

            const countryName =
              e.features[0].properties?.ADMIN || e.features[0].properties?.name;
            popup
              .setLngLat(e.lngLat)
              .setHTML(`<strong>${countryName}</strong>`)
              .addTo(map);
          }
        }
      );

      map.on("mouseleave", "country-fills", () => {
        if (hoveredCountryId !== undefined) {
          map.setFeatureState(
            { source: "countries", id: hoveredCountryId },
            { hover: false }
          );
        }
        hoveredCountryId = undefined;
        popup.remove();
      });
    });

    let isUserInteracting = false;
    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    function spinGlobe() {
      const zoom = map.getZoom();
      if (!isUserInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        map.easeTo({
          center,
          duration: 100,
          easing: (n) => n,
        });
      }
    }

    map.on("mousedown", () => (isUserInteracting = true));
    map.on("mouseup", () => {
      isUserInteracting = false;
      spinGlobe();
    });
    map.on("dragstart", () => (isUserInteracting = true));
    map.on("moveend", spinGlobe);

    spinGlobe();

    return () => map.remove();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1>AI-powered FRA Atlas & Decision Support System</h1>
        <p>
          Digitizing forest rights, empowering communities, enabling smarter
          governance through innovative technology solutions.
        </p>
        <div className={styles.buttons}>
          <button className={styles.primary}>Get Started Now</button>
          <button className={styles.secondary}>Explore Features</button>
        </div>
      </div>
      <div id="map" className={styles.map}></div>
    </section>
  );
};

export default HeroSection;
