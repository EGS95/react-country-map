import { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import MapContainer from "./components/MapContainer";
import "./App.css";

function App() {
  const mapRef = useRef();
  const [center, setCenter] = useState([35.8623, 33.8547]);

  const zoomToMap = (coordinates) => {
    // setCenter(coodrdinates);
    mapRef.current.setNewLocation(coordinates);
  };

  return (
    <div id="container">
      <Sidebar zoomToMap={zoomToMap} />
      <MapContainer center={center} ref={mapRef} />
    </div>
  );
}

export default App;
