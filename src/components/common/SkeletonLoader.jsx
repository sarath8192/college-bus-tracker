import React from "react";

export const StatsSkeleton = () => {
  return (
    <div className="grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="stat-card" style={{ minHeight: "130px" }}>
          <div>
            <div className="skeleton-box" style={{ width: "80px", height: "14px", marginBottom: "12px" }}></div>
            <div className="skeleton-box" style={{ width: "120px", height: "32px" }}></div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div className="skeleton-box" style={{ width: "32px", height: "32px", borderRadius: "8px" }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="table-container">
      <table className="modern-table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <div className="skeleton-box" style={{ width: "60px", height: "14px" }}></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}>
                  <div className="skeleton-box" style={{ width: c === 0 ? "30px" : "100px", height: "14px" }}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="card" style={{ padding: "24px" }}>
      <div className="skeleton-box" style={{ width: "140px", height: "18px", marginBottom: "16px" }}></div>
      <div className="skeleton-box" style={{ width: "100%", height: "80px", borderRadius: "8px" }}></div>
    </div>
  );
};

export const ListSkeleton = ({ items = 3 }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="card" style={{ padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <div className="skeleton-box" style={{ width: "120px", height: "16px" }}></div>
            <div className="skeleton-box" style={{ width: "60px", height: "16px", borderRadius: "999px" }}></div>
          </div>
          <div className="skeleton-box" style={{ width: "100%", height: "36px", marginTop: "8px", borderRadius: "6px" }}></div>
        </div>
      ))}
    </div>
  );
};
