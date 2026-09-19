import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FarmBackground } from "../backgrounds/FarmBackground";
import { CutoutCharacter } from "../components/CutoutCharacter";

/**
 * Cagnolino - ciclo "idle" con l'illustrazione vera (Canva).
 *
 * Rispetto alla versione disegnata a mano: manteniamo il respiro/bounce
 * del corpo intero (funziona su qualunque illustrazione piatta), ma NON
 * animiamo più singolarmente occhi/coda - servirebbero asset separati
 * per quelle parti. Da rivalutare più avanti se serve un rig più fine.
 */
export const CagnolinoIdle: React.FC = () => {
  const frame = useCurrentFrame();

  // Respiro / bounce verticale, stesso schema di prima
  const bounceCycle = 60;
  const bouncePhase = (frame % bounceCycle) / bounceCycle;
  const bounceY = Math.sin(bouncePhase * Math.PI * 2) * 8;
  // Leggerissimo "schiacciamento" per dare più vita al respiro
  const squash = 1 + Math.sin(bouncePhase * Math.PI * 2) * 0.015;

  return (
    <AbsoluteFill>
      <FarmBackground />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end" }}>
        <div
          style={{
            transform: `translateY(${bounceY}px) scaleY(${squash})`,
            marginBottom: 40,
          }}
        >
          <CutoutCharacter fileName="cagnolino.png" width={500} height={500} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};