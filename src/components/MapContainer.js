import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import config from "@arcgis/core/config";
import "../App.css";

const MapContainer = forwardRef(({ center }, ref) => {
  // config.apiKey =
  //   "AAPK1cfdb9758bad43cab47edaefc9a1b686j5LIzscHXKAgqloA7svZpG0z1Zzo133MdUipEqjscC8J3oN_670XHF2AXhLJqgKX";
  const mapDiv = useRef(null);
  const map = new Map();
  const view = new MapView();

  useImperativeHandle(ref, () => ({
    setNewLocation(coord) {
      console.log("zooming...");
      console.log(coord);
      if (Array.isArray(coord))
        view.goTo({
          center: coord,
        });
    },
  }));

  useEffect(() => {
    console.log("render");
    if (mapDiv.current) {
      map.basemap = "topo-vector";
      view.map = map;
      view.center = center;
      view.zoom = "7";
      view.container = mapDiv.current;

      if (Array.isArray(center))
        view.goTo({
          center: center,
        });
    }
  });

  return <div id="viewDiv" ref={mapDiv}></div>;
});

export default MapContainer;
