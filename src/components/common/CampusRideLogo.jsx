import React from "react";

const CampusRideLogo = ({ width = "40px", height = "40px", showText = true, textColor = "#ffffff", iconColor = "#2563eb", pulse = false }) => {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{
          width,
          height,
          flexShrink: 0,
          animation: pulse ? "pulse-ring 2.5s infinite" : "none",
          borderRadius: "50%"
        }}
      >
        <circle cx="256" cy="256" r="240" fill="#0f172a" />
        <path
          d="M256,40 C160,40 80,120 80,216 C80,330 220,460 240,478 C250,488 262,488 272,478 C292,460 432,330 432,216 C432,120 352,40 256,40 Z"
          fill="url(#logoGrad)"
        />
        <circle cx="256" cy="190" r="130" fill="#0f172a" />
        <g transform="translate(146, 100) scale(0.44)">
          <rect x="50" y="80" width="400" height="340" rx="60" fill="#2563eb" />
          <rect x="50" y="240" width="400" height="180" rx="20" fill="#1d4ed8" />
          <rect x="90" y="120" width="320" height="100" rx="16" fill="#e2e8f0" />
          <rect x="245" y="120" width="10" height="100" fill="#2563eb" />
          <circle cx="120" cy="360" r="30" fill="#f59e0b" />
          <circle cx="380" cy="360" r="30" fill="#f59e0b" />
          <rect x="180" y="340" width="142" height="40" rx="10" fill="#475569" />
          <line x1="210" y1="360" x2="290" y2="360" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />
          <rect x="30" y="420" width="440" height="40" rx="15" fill="#334155" />
          <path d="M50,150 L10,170 L10,210 L50,190 Z" fill="#1e293b" />
          <path d="M450,150 L490,170 L490,210 L450,190 Z" fill="#1e293b" />
        </g>
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <span
          style={{
            color: textColor,
            fontWeight: 800,
            fontSize: "20px",
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          Campus<span style={{ color: "#3b82f6" }}>Ride</span>
        </span>
      )}
    </div>
  );
};

export default CampusRideLogo;
