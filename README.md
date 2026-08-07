# Quadro — Budget & cuscinetto

App personale di budget: importa gli estratti BPER (PDF o Lista Movimenti XLS) e il
Download.CSV di PayPal, categorizza da sola, mostra tutti i mesi contro il budget,
gestisce il fondo cassa contanti e traccia il cuscinetto verso i 6.000 €.

## Struttura
- `index.html` — struttura della pagina
- `styles.css` — stili
- `app.js` — tutta la logica (import, regole, matrice, bilancio, PWA)
- `data.js` — dati storici iniziali (gen–lug 2026)
- `sw.js` + `manifest.webmanifest` + `icons/` — parte PWA (offline + installazione)

## Avvio rapido in VS Code
1. Apri la cartella in VS Code.
2. Installa l'estensione **Live Server** (Ritwick Dey).
3. Tasto destro su `index.html` → **Open with Live Server**.
   (In alternativa da terminale: `npx serve .` e apri l'indirizzo indicato.)

Nota: aprire `index.html` con doppio click (file://) funziona per usare l'app,
ma la parte PWA (installazione, offline) richiede un server locale o l'hosting.

## Pubblicarla (per usarla da telefono e installarla)
Il modo più semplice è GitHub Pages:
1. Crea un repository (es. `quadro`) e carica questi file.
2. Settings → Pages → Branch `main`, cartella `/ (root)` → Save.
3. Dopo un minuto l'app è su `https://TUONOME.github.io/quadro/`.
4. Aprendola da Chrome (PC o Android) compare l'icona **Installa**: da lì diventa
   un'app con la sua finestra e la sua icona, funzionante anche offline.

## Dove vivono i dati (importante)
- I dati stanno nel **browser** (localStorage), legati all'indirizzo da cui apri l'app.
  Cambiare indirizzo (es. da Live Server a GitHub Pages) = archivio nuovo e vuoto:
  usa **Scarica backup** dalla vecchia e **Carica backup** nella nuova.
- Su Chrome/Edge puoi usare **Collega file di backup**: un click a inizio sessione
  e l'app legge/scrive `quadro-backup.json` sul disco a ogni modifica.
- Fai comunque un backup JSON ogni tanto: è l'assicurazione totale.

## Aggiornamenti dell'app
Se sostituisci i file con una versione nuova, incrementa la versione in `sw.js`
(`quadro-v1` → `quadro-v2`) così il service worker scarica i file aggiornati.
I dati non si toccano: vivono nel browser, non nei file.
