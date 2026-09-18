import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { FarmBackground } from "../backgrounds/FarmBackground";

// Palette del Character Bible (vedi documento di progetto):
// Cagnolino = giallo/marrone chiaro
const COLORS = {
  furLight: "#F2C879",
  furDark: "#D9A857",
  belly: "#FBEBC9",
  outline: "#7A5324",
};

/**
 * Cagnolino - ciclo "idle" riutilizzabile.
 *
 * Pensato come TEMPLATE: lo stesso schema (bounce + blink + coda che
 * scodinzola, tutto guidato da useCurrentFrame) verrà riusato per gli
 * altri 4 personaggi del cast, cambiando solo colori e proporzioni.
 *
 * Il loop dura 150 frame (5s a 30fps) e è pensato per essere ripetuto:
 * l'ultimo frame torna vicino al primo per un loop senza scatti visibili.
 */
export const CagnolinoIdle: React.FC = () => {
  const frame = useCurrentFrame();

  // --- Respiro / bounce verticale (loop continuo su tutta la durata) ---
  const bounceCycle = 60; // un "respiro" ogni 2 secondi
  const bouncePhase = (frame % bounceCycle) / bounceCycle;
  const bounceY = Math.sin(bouncePhase * Math.PI * 2) * 10; // +-10px

  // --- Battito di ciglia: veloce e raro, non ipnotico ---
  // Ammicca due volte nei 5 secondi, in punti diversi del ciclo.
  const blinkAt = [40, 110];
  const blinkDuration = 6; // frame
  let eyeScaleY = 1;
  for (const t of blinkAt) {
    if (frame >= t && frame <= t + blinkDuration) {
      const local = (frame - t) / blinkDuration; // 0 -> 1
      // Chiude e riapre l'occhio con una curva morbida
      eyeScaleY = 1 - Math.sin(local * Math.PI) * 0.9;
    }
  }

  // --- Coda che scodinzola: oscillazione continua e allegra ---
  const tailCycle = 20; // scodinzola veloce, ma non frenetica
  const tailAngle = Math.sin((frame / tailCycle) * Math.PI * 2) * 18; // +-18 gradi

  return (
    <AbsoluteFill>
      <FarmBackground />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <svg
          viewBox="0 0 600 600"
          width="600"
          height="600"
          style={{ transform: `translateY(${bounceY}px)`, marginBottom: 40 }}
        >
          {/* Coda (dietro il corpo, ruota da un punto di ancoraggio) */}
          <g
            transform={`translate(150,380) rotate(${tailAngle})`}
            style={{ transformOrigin: "150px 380px" }}
          >
            <ellipse
              cx="0"
              cy="0"
              rx="55"
              ry="20"
              fill={COLORS.furLight}
              stroke={COLORS.outline}
              strokeWidth="4"
            />
          </g>

          {/* Corpo */}
          <ellipse
            cx="300"
            cy="400"
            rx="150"
            ry="120"
            fill={COLORS.furLight}
            stroke={COLORS.outline}
            strokeWidth="6"
          />
          {/* Pancia più chiara */}
          <ellipse cx="300" cy="440" rx="95" ry="70" fill={COLORS.belly} />

          {/* Zampe (semplici, statiche: sufficiente per un ciclo idle) */}
          <ellipse cx="230" cy="500" rx="35" ry="25" fill={COLORS.furDark} />
          <ellipse cx="370" cy="500" rx="35" ry="25" fill={COLORS.furDark} />

          {/* Testa: grande, proporzioni "da cucciolo" */}
          <circle
            cx="300"
            cy="230"
            r="140"
            fill={COLORS.furLight}
            stroke={COLORS.outline}
            strokeWidth="6"
          />

          {/* Orecchie a goccia, morbide */}
          <ellipse
            cx="185"
            cy="170"
            rx="45"
            ry="70"
            fill={COLORS.furDark}
            stroke={COLORS.outline}
            strokeWidth="4"
            transform="rotate(-20 185 170)"
          />
          <ellipse
            cx="415"
            cy="170"
            rx="45"
            ry="70"
            fill={COLORS.furDark}
            stroke={COLORS.outline}
            strokeWidth="4"
            transform="rotate(20 415 170)"
          />

          {/* Muso */}
          <ellipse cx="300" cy="280" rx="70" ry="50" fill={COLORS.belly} />
          <ellipse cx="300" cy="270" rx="18" ry="13" fill={COLORS.outline} />

          {/* Occhi grandi, con battito di ciglia */}
          <g style={{ transformOrigin: "245px 210px" }}>
            <ellipse
              cx="245"
              cy="210"
              rx="28"
              ry={28 * eyeScaleY}
              fill="white"
              stroke={COLORS.outline}
              strokeWidth="3"
            />
            <circle cx="250" cy="212" r={12 * eyeScaleY} fill="#3A2A14" />
          </g>
          <g style={{ transformOrigin: "355px 210px" }}>
            <ellipse
              cx="355"
              cy="210"
              rx="28"
              ry={28 * eyeScaleY}
              fill="white"
              stroke={COLORS.outline}
              strokeWidth="3"
            />
            <circle cx="350" cy="212" r={12 * eyeScaleY} fill="#3A2A14" />
          </g>

          {/* Guance rosa: tenerezza, mai inquietante */}
          <circle cx="205" cy="260" r="18" fill="#FFC7C7" opacity="0.7" />
          <circle cx="395" cy="260" r="18" fill="#FFC7C7" opacity="0.7" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
