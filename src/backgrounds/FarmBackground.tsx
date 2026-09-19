import React from "react";

// Sfondo "fattoria felice" condiviso da tutti i personaggi/canali.
// Volutamente semplice: cielo + prato + un sole fisso, coerente con lo
// stile "2D vettoriale, colori semplici" scelto per il progetto.
export const FarmBackground: React.FC = () => {
  return (
    <svg
      viewBox="0 0 1920 1080"
      width="100%"
      height="100%"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {/* Cielo */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#AEE7FF" />
          <stop offset="100%" stopColor="#E8F9FF" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1920" height="1080" fill="url(#sky)" />

      {/* Sole */}
      <circle cx="1650" cy="180" r="90" fill="#FFE066" />

      {/* Nuvole semplici */}
      <g fill="#FFFFFF" opacity="0.9">
        <ellipse cx="300" cy="160" rx="90" ry="40" />
        <ellipse cx="380" cy="150" rx="70" ry="35" />
        <ellipse cx="220" cy="150" rx="60" ry="30" />
      </g>

      {/* Prato */}
      <rect x="0" y="760" width="1920" height="320" fill="#8FD97A" />
      <rect x="0" y="740" width="1920" height="40" fill="#79C868" />
    </svg>
  );
};
