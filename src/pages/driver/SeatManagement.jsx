import { useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";

function SeatManagement() {
  const [occupied, setOccupied] = useState(20);
  const totalSeats = 40;

  // We maintain a list of seats which the driver can toggle
  const [seats, setSeats] = useState(() => {
    const list = [];
    for (let i = 1; i <= totalSeats; i++) {
      list.push({ id: i, label: `S${i}`, isOccupied: i <= 20 });
    }
    return list;
  });

  const toggleSeat = (id) => {
    const updated = seats.map((s) => {
      if (s.id === id) {
        const nextState = !s.isOccupied;
        // Adjust general count
        setOccupied(prev => nextState ? prev + 1 : prev - 1);
        return { ...s, isOccupied: nextState };
      }
      return s;
    });
    setSeats(updated);
  };

  const handleIncrement = () => {
    if (occupied < totalSeats) {
      // Find the first unoccupied seat and mark it occupied
      const firstFree = seats.find(s => !s.isOccupied);
      if (firstFree) {
        toggleSeat(firstFree.id);
      } else {
        setOccupied(occupied + 1);
      }
    }
  };

  const handleDecrement = () => {
    if (occupied > 0) {
      // Find the last occupied seat and mark it free
      const occupiedSeats = [...seats].reverse();
      const lastOccupied = occupiedSeats.find(s => s.isOccupied);
      if (lastOccupied) {
        toggleSeat(lastOccupied.id);
      } else {
        setOccupied(occupied - 1);
      }
    }
  };

  const available = totalSeats - occupied;
  const occupancyPercentage = Math.round((occupied / totalSeats) * 100);

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Seat Management</h1>
            <p>Update passenger count in real time. Students see available seat statuses instantly.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "24px", alignItems: "start" }} className="grid-2">
          
          {/* Left panel: Quick controls */}
          <div className="card" style={{ textAlign: "center" }}>
            <span className="badge badge-active" style={{ marginBottom: "16px", textTransform: "uppercase" }}>Bus VIT-01 Seating</span>
            
            {/* Visual Seating Meter Circle */}
            <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 24px" }}>
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  border: "10px solid var(--neutral-border)",
                  borderTopColor: "var(--primary)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-sm)",
                  transition: "var(--transition-fast)",
                }}
              >
                <span style={{ fontSize: "32px", fontWeight: "800", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>
                  {occupancyPercentage}%
                </span>
                <span style={{ fontSize: "10px", color: "var(--neutral-muted)", textTransform: "uppercase", fontWeight: "700" }}>Occupied</span>
              </div>
            </div>

            {/* Quick Metrics display */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", borderBottom: "1px solid var(--neutral-border)", paddingBottom: "20px", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "600", textTransform: "uppercase" }}>Total</div>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>{totalSeats}</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "600", textTransform: "uppercase" }}>Occupied</div>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--neutral-dark)", fontFamily: "'Outfit', sans-serif" }}>{occupied}</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "600", textTransform: "uppercase" }}>Available</div>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--success)", fontFamily: "'Outfit', sans-serif" }}>{available}</div>
              </div>
            </div>

            {/* Large Mobile buttons */}
            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={handleDecrement}
                disabled={occupied === 0}
                className="btn btn-outline"
                style={{
                  flex: 1,
                  fontSize: "24px",
                  height: "60px",
                  borderRadius: "12px",
                  fontWeight: "700",
                }}
              >
                -
              </button>
              
              <button
                onClick={handleIncrement}
                disabled={occupied === totalSeats}
                className="btn btn-primary"
                style={{
                  flex: 2,
                  fontSize: "24px",
                  height: "60px",
                  borderRadius: "12px",
                  fontWeight: "700",
                }}
              >
                +
              </button>
            </div>
            
            <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--neutral-muted)" }}>
              Tap plus or minus buttons or click directly on the cabin seating grid to update capacity.
            </p>
          </div>

          {/* Right panel: Visual interactive cabin seating */}
          <div className="card">
            <h2>Cabin Layout Controls</h2>
            <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "20px" }}>
              Click individual seats to toggle occupied status.
            </p>

            <div className="bus-cabin-frame" style={{ padding: "20px" }}>
              <div className="bus-driver-area" style={{ marginBottom: "16px", paddingBottom: "16px" }}>
                <div className="driver-wheel">⚙️</div>
                <div style={{ fontSize: "11px", color: "var(--neutral-muted)", fontWeight: "700" }}>Entrance ➔</div>
              </div>

              <div className="bus-seating-grid" style={{ gap: "10px 14px" }}>
                {seats.map((seat) => (
                  <div
                    key={seat.id}
                    onClick={() => toggleSeat(seat.id)}
                    className={`bus-seat ${seat.isOccupied ? "occupied" : "available"}`}
                    style={{ width: "38px", height: "38px", fontSize: "10px" }}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>

              <div className="seat-legend" style={{ marginTop: "24px", paddingTop: "16px", gap: "16px" }}>
                <div className="legend-item">
                  <div className="legend-color available" style={{ width: "14px", height: "14px" }}></div>
                  <span style={{ fontSize: "12px" }}>Available seat</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color occupied" style={{ width: "14px", height: "14px" }}></div>
                  <span style={{ fontSize: "12px" }}>Occupied seat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </StudentLayout>
  );
}

export default SeatManagement;
