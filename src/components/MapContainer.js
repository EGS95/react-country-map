import { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import config from "@arcgis/core/config";
import "../App.css";

export default function MapContainer({ center }) {
  config.apiKey =
    "AAPK1cfdb9758bad43cab47edaefc9a1b686j5LIzscHXKAgqloA7svZpG0z1Zzo133MdUipEqjscC8J3oN_670XHF2AXhLJqgKX";
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: "arcgis-topographic",
      });

      const view = new MapView({
        map: map,
        center: center,
        zoom: 7,
        container: mapDiv.current,
      });
      if (Array.isArray(center))
        view.goTo({
          center: center,
        });
    }
  });

  return <div id="viewDiv" ref={mapDiv}></div>;
}
