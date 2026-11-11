# WeFORM – MVP App mobile

Mockup cliccabile dell'app WeFORM per la formazione e la gestione del personale Horeca, creato con Claude Design.

**Demo online:** https://mario4art.github.io/WeFORM-MVP-App-mobile/

Si parte dalla schermata iniziale: scegli la lingua (IT, EN, DE, ES, UK) con il quadrato in alto a destra, poi entra come **Dipendente** o come **Titolare / Manager**.

## Cosa contiene (Versione 3)

- **Dipendente:** Home con i video dei moduli da scorrere come reel (aprono la ricerca su YouTube), quiz di 3 domande, turni con timbratura e scambio turni tra colleghi, Academy, ferie e permessi, profilo con busta paga in PDF e documenti d'esempio.
- **Titolare / Manager:** benvenuto e login, dashboard multisede, approvazioni (ferie, permessi, scambi turno), planner turni con proposta AI, team con scheda dipendente, formazione con libreria video e scadenze HACCP, WeFORM AI.

Nomi, numeri, quiz e documenti sono dati di esempio.

## Struttura

- `index.html` – apre la schermata iniziale (`v3/Main.dc.html`)
- `v3/Main.dc.html` – scelta della lingua e del ruolo
- `v3/Dipendente.dc.html`, `v3/Titolare.dc.html` – app in italiano
- `v3/en/`, `v3/de/`, `v3/es/`, `v3/uk/` – le stesse app in inglese, tedesco, spagnolo e ucraino
- `assets/` – logo WeFORM e busta paga di esempio (PDF)
- `support.js`, `vendor/` – runtime necessario per far funzionare il mockup nel browser

## Vederlo in locale

Serve la cartella con un piccolo server, per esempio `python3 -m http.server`, e apri `http://localhost:8000/`. Aperto direttamente da file (`file://`) alcuni browser bloccano gli script.

## Schermo intero sul telefono

Aperto dal telefono, il mockup riempie tutta la larghezza e l'altezza dello schermo; dal computer resta in una cornice centrata. Per aprirlo come un'app, senza le barre del browser, aggiungilo alla schermata Home: su iPhone Safari → Condividi → «Aggiungi alla schermata Home»; su Android Chrome → menu ⋮ → «Aggiungi a schermata Home» / «Installa app».
