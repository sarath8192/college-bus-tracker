import StudentLayout from "../../components/layouts/StudentLayout";
import BusMap from "../../components/Maps/BusMap";

import { busLocation } from "../../mock/location";

function LiveTracking() {
  return (
    <StudentLayout>

      <h1>🚌 Live Bus Tracking</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <strong>Bus Number:</strong>
          {" "}
          {busLocation.busNumber}
        </div>

        <div>
          <strong>Driver:</strong>
          {" "}
          {busLocation.driver}
        </div>

        <div>
          <strong>Speed:</strong>
          {" "}
          {busLocation.speed} km/h
        </div>

        <div>
          <strong>ETA:</strong>
          {" "}
          {busLocation.eta}
        </div>
      </div>

      <BusMap />

    </StudentLayout>
  );
}

export default LiveTracking;