import React, { useEffect, useRef, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

/**
 * CutoutCharacter
 *
 * Le illustrazioni esportate da Canva (piano Free) arrivano su sfondo
 * bianco pieno, non trasparente. Invece di dipendere da un tool esterno
 * per "tagliare" lo sfondo, lo facciamo qui a runtime: carichiamo il PNG
 * in un canvas nascosto e rendiamo trasparente ogni pixel vicino al
 * bianco puro, poi disegniamo il risultato.
 *
 * Funziona bene perché le illustrazioni sono state generate apposta
 * "isolated on plain white background" - un bianco pulito, senza sfondo
 * complesso da ritagliare.
 */

const WHITE_THRESHOLD = 235; // sopra questo valore (su 255) un pixel è considerato "sfondo"

interface CutoutCharacterProps {
  /** Nome del file dentro public/characters/, es. "cagnolino.png" */
  fileName: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}

export const CutoutCharacter: React.FC<CutoutCharacterProps> = ({
  fileName,
  width,
  height,
  style,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [handle] = useState(() => delayRender(`Cutout ${fileName}`));

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = staticFile(`characters/${fileName}`);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        continueRender(handle);
        return;
      }
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD) {
          data[i + 3] = 0; // azzera l'alpha: pixel trasparente
        }
      }
      ctx.putImageData(imageData, 0, 0);

      setDataUrl(canvas.toDataURL("image/png"));
      continueRender(handle);
    };

    img.onerror = () => {
      console.error(`Impossibile caricare ${fileName}`);
      continueRender(handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  if (!dataUrl) {
    return null;
  }

  return (
    <img
      src={dataUrl}
      width={width}
      height={height}
      style={{ objectFit: "contain", ...style }}
      alt=""
    />
  );
};