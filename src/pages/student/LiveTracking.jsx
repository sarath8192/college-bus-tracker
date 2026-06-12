import StudentLayout from "../../components/layouts/StudentLayout";
import BusMap from "../../components/Maps/BusMap";

function LiveTracking() {
  return (
    <StudentLayout>
      <h1>Live Bus Tracking</h1>

      <BusMap />
    </StudentLayout>
  );
}

export default LiveTracking;