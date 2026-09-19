import React from "react";
import { Composition } from "remotion";
import { CagnolinoIdle } from "./characters/CagnolinoIdle";

// Composizione di test: il cagnolino in loop "idle" (respiro, battito ciglia,
// coda che scodinzola) su sfondo fattoria. 150 frame a 30fps = 5 secondi,
// pensati per essere ripetuti in loop nel video finale.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CagnolinoIdle"
        component={CagnolinoIdle}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
