import { useEffect, useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { getBuses } from "../../api/busApi";

const SeatAvailability = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const fetchBuses = async () => {
    try {
      const data = await getBuses();
      setBuses(data);
      if (data.length > 0) {
        setSelectedBusId(data[0].id);
      }
    } catch (error) {
      console.log("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Analyzing seat vacancy charts...</p>
        </div>
      </StudentLayout>
    );
  }

  const selectedBus = buses.find((b) => b.id === selectedBusId) || buses[0];

  // Helper to generate visual seats dynamically based on occupancy data
  const generateSeats = (bus) => {
    if (!bus) return [];
    const total = bus.total_seats || bus.totalSeats || 40;
    const occupiedCount = bus.occupied_seats || bus.occupiedSeats || 0;
    
    const seatsList = [];
    
    // We generate a deterministic layout of occupied/reserved/available seats
    for (let i = 1; i <= total; i++) {
      let status = "available";
      
      // Distribute occupied and reserved deterministically
      if (i <= occupiedCount) {
        status = "occupied";
      } else if (i % 7 === 0 && i > occupiedCount) {
        status = "reserved";
      }
      
      seatsList.push({ id: i, label: `S${i}`, status });
    }
    
    return seatsList;
  };

  const seats = generateSeats(selectedBus);

  const handleSeatClick = (seat) => {
    if (seat.status === "occupied" || seat.status === "reserved") return;
    
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  return (
    <StudentLayout>
      <div className="page">
        <div className="page-header">
          <div className="page-title-area">
            <h1>Seat Availability</h1>
            <p>Select a fleet to check live available seats and interactively view cabin layouts.</p>
          </div>
        </div>

        {buses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🪑</div>
            <h3>No Seating Data</h3>
            <p>Currently, there are no registered buses reporting seating occupancy.</p>
          </div>
        ) : (
          <div className="grid-2">
            {/* Left Side: Bus list */}
            <div>
              <div className="card">
                <h2>Roster Fleet Selector</h2>
                <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginTop: "4px", marginBottom: "20px" }}>
                  Select any bus in the registry to inspect seating configurations.
                </p>
                
                {/* Desktop and Tablet Responsive Table */}
                <div className="table-container" style={{ display: "block", marginTop: 0 }}>
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Bus Number</th>
                        <th style={{ textAlign: "center" }}>Available Seats</th>
                        <th>Occupancy Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buses.map((bus) => {
                        const total = bus.total_seats || bus.totalSeats || 40;
                        const occupied = bus.occupied_seats || bus.occupiedSeats || 0;
                        const available = Math.max(0, total - occupied);
                        const fillPercent = Math.round((occupied / total) * 100);
                        const isActive = bus.id === selectedBusId;

                        return (
                          <tr
                            key={bus.id}
                            onClick={() => {
                              setSelectedBusId(bus.id);
                              setSelectedSeats([]);
                            }}
                            style={{
                              cursor: "pointer",
                              backgroundColor: isActive ? "var(--primary-light)" : "transparent"
                            }}
                          >
                            <td style={{ fontWeight: "700", color: isActive ? "var(--primary)" : "var(--neutral-dark)" }}>
                              {bus.bus_number || bus.busNumber || "N/A"}
                            </td>
                            <td style={{ textAlign: "center", fontWeight: "700", color: available > 5 ? "var(--success)" : "var(--danger)" }}>
                              {available} / {total}
                            </td>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "80px", height: "6px", backgroundColor: "var(--neutral-border)", borderRadius: "3px", overflow: "hidden" }}>
                                  <div
                                    style={{
                                      width: `${fillPercent}%`,
                                      height: "100%",
                                      backgroundColor: fillPercent > 80 ? "var(--danger)" : fillPercent > 60 ? "var(--warning)" : "var(--success)"
                                    }}
                                  />
                                </div>
                                <span style={{ fontSize: "11px", fontWeight: "600" }}>{fillPercent}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Selector list */}
                <div className="mobile-cards-grid" style={{ display: "none", flexDirection: "column", gap: "12px" }}>
                  {buses.map((bus) => {
                    const total = bus.total_seats || bus.totalSeats || 40;
                    const occupied = bus.occupied_seats || bus.occupiedSeats || 0;
                    const available = Math.max(0, total - occupied);
                    const isActive = bus.id === selectedBusId;

                    return (
                      <div
                        key={bus.id}
                        onClick={() => {
                          setSelectedBusId(bus.id);
                          setSelectedSeats([]);
                        }}
                        className="card"
                        style={{
                          cursor: "pointer",
                          borderColor: isActive ? "var(--primary)" : "var(--neutral-border)",
                          backgroundColor: isActive ? "var(--primary-light)" : "var(--white)",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700" }}>
                          <span>Bus: {bus.bus_number || bus.busNumber || "N/A"}</span>
                          <span style={{ color: available > 5 ? "var(--success)" : "var(--danger)" }}>{available} Available</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side: Seating visualizer */}
            <div>
              {selectedBus && (
                <div className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h2>Bus Seating Visualizer</h2>
                    <span className="badge badge-active">{selectedBus.bus_number || selectedBus.busNumber}</span>
                  </div>
                  <p style={{ color: "var(--neutral-muted)", fontSize: "13px", marginBottom: "24px" }}>
                    Interactive representation of seat configurations. Click on any green seat to reserve it.
                  </p>

                  <div className="bus-cabin-frame">
                    <div className="bus-driver-area">
                      <div className="driver-wheel">⚙️</div>
                      <div style={{ fontSize: "12px", color: "var(--neutral-muted)", fontWeight: "600" }}>Entrance Door ➔</div>
                    </div>

                    <div className="bus-seating-grid">
                      {seats.map((seat) => {
                        const isChosen = selectedSeats.includes(seat.id);
                        let seatClass = seat.status;
                        if (isChosen) seatClass = "selected";

                        return (
                          <div
                            key={seat.id}
                            className={`bus-seat ${seatClass}`}
                            onClick={() => handleSeatClick(seat)}
                            title={`Seat ${seat.id} - ${seat.status}`}
                          >
                            {seat.id}
                          </div>
                        );
                      })}
                    </div>

                    <div className="seat-legend">
                      <div className="legend-item">
                        <div className="legend-color available"></div>
                        <span>Available</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color selected"></div>
                        <span>Selected</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color occupied"></div>
                        <span>Occupied</span>
                      </div>
                      <div className="legend-item">
                        <div className="legend-color reserved"></div>
                        <span>Reserved</span>
                      </div>
                    </div>
                  </div>

                  {selectedSeats.length > 0 && (
                    <div className="fade-in-up" style={{ marginTop: "24px", padding: "16px", backgroundColor: "var(--primary-light)", borderRadius: "10px", border: "1px solid rgba(37, 99, 235, 0.1)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <strong style={{ fontSize: "14px", color: "var(--primary-hover)" }}>Selected Seats ({selectedSeats.length})</strong>
                          <p style={{ fontSize: "13px", color: "var(--neutral-dark)", marginTop: "2px" }}>
                            Seat numbers: {selectedSeats.map(s => `#${s}`).join(", ")}
                          </p>
                        </div>
                        <button
                          className="btn btn-primary"
                          style={{ padding: "8px 16px", fontSize: "13px" }}
                          onClick={() => alert(`Visual Seat booking registered for seat(s): ${selectedSeats.join(", ")}`)}
                        >
                          Confirm Seats
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .table-container { display: none !important; }
          .mobile-cards-grid { display: flex !important; }
        }
      `}} />
    </StudentLayout>
  );
};

export default SeatAvailability;
