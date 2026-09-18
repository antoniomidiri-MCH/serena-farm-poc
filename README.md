# Serena Farm - Proof of Concept (personaggio pilota)

Questo è il primo pezzo tecnico della pipeline: un'animazione "idle" del
cagnolino (respiro, battito di ciglia, coda che scodinzola), su sfondo
fattoria, pronta per essere sincronizzata con l'audio nella prossima fase.

**Nota:** questo codice è stato scritto ma non testato in questo ambiente,
perché il sandbox in cui è stato creato non ha accesso a Internet e quindi
non può scaricare i pacchetti npm. Vanno installati sul tuo computer.

## Prerequisiti

- **Node.js 18 o superiore** (verifica con `node --version` da terminale;
  se non ce l'hai, scaricalo da nodejs.org)
- Un browser moderno (Chrome consigliato) per l'anteprima

## Come provarlo

1. Apri il Terminale, entra nella cartella del progetto:
   ```
   cd serena-farm-poc
   ```
2. Installa le dipendenze (serve connessione internet, la prima volta
   scarica anche una versione headless di Chrome per il rendering):
   ```
   npm install
   ```
3. Avvia l'anteprima interattiva nel browser:
   ```
   npm start
   ```
   Si aprirà una finestra di Remotion Studio con l'animazione in loop:
   qui puoi vedere subito se il personaggio si muove come previsto.
4. Per generare il file video vero e proprio (mp4):
   ```
   npm run render
   ```
   Il file uscirà in `out/cagnolino-idle.mp4`.

## Cosa guardare per valutare se "ci convince"

- Il bounce (respiro) è troppo marcato/troppo debole?
- Il battito di ciglia si vede bene o è troppo veloce/lento?
- La coda che scodinzola sembra allegra o innaturale?
- La qualità visiva generale è "discreta" come da obiettivo, o va rivista?

## Prossimi passi (dopo la validazione di questo pilota)

- Ripetere lo stesso schema per gli altri 4 personaggi (agnello, pulcino,
  vitello, puledro), riusando `FarmBackground.tsx` e la struttura di
  `CagnolinoIdle.tsx` come template
- Aggiungere una seconda animazione "canto" (bocca che si apre/chiude a
  tempo), da sincronizzare poi con l'audio via Whisper
- Collegare l'audio della canzone di test (MusicGen/Hugging Face) alla
  composizione Remotion
