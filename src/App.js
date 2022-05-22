import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MapContainer from "./components/MapContainer";
import "./App.css";

function App() {
  const [center, setCenter] = useState([35.8623, 33.8547]);

  const zoomToMap = (coodrdinates) => {
    setCenter(coodrdinates);
  };

  return (
    <div id="container">
      <Sidebar zoomToMap={zoomToMap} />
      <MapContainer center={center} />
    </div>
  );
}

export default App;
