# 🗡️ Demon Slayer Chat - Web PWA

Eine interaktive Story-App im Demon Slayer Universum, gebaut mit Next.js 14.

## 🚀 Features

- ✅ 11 spielbare Charaktere (Dämonenjäger & Dämonen)
- ✅ KI-generierte Stories mit OpenAI GPT-4o
- ✅ Progressive Web App (PWA) - installierbar auf Mobile
- ✅ Responsive Design (Mobile-First)
- ✅ Text-to-Speech mit Browser Web Speech API
- ✅ Lokale Speicherung der Settings
- ✅ Deutsche Sprache

## 📦 Technologie-Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: React Context API
- **API**: OpenAI GPT-4o
- **PWA**: next-pwa
- **Deployment**: Docker (Dokploy-ready)

## 🛠️ Lokale Entwicklung

### Voraussetzungen

- Node.js 20+
- npm

### Setup

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

App läuft auf: http://localhost:3000

### Build

```bash
# Production Build erstellen
npm run build

# Production Server starten
npm start
```

## 🐳 Docker Deployment

### Lokaler Docker Build

```bash
# Image bauen
docker build -t demon-slayer-chat .

# Container starten
docker run -p 3000:3000 demon-slayer-chat
```

## 🚢 Dokploy Deployment

### Schritt 1: Repository vorbereiten

Stelle sicher, dass das `web/` Verzeichnis in deinem Git-Repository ist.

### Schritt 2: Dokploy Projekt erstellen

1. Logge dich in Dokploy ein
2. Erstelle ein neues Projekt
3. Wähle "Docker" als Deployment-Methode

### Schritt 3: Konfiguration

**Repository Settings:**
- Repository URL: `https://github.com/Winterhuder79/anime-chat.git`
- Branch: `master`
- Build Context: `web`
- Dockerfile Path: `Dockerfile`

**Port Konfiguration:**
- Container Port: `3000`

**Domain:**
- Füge deine Domain hinzu (z.B. `demon-slayer.example.com`)

### Schritt 4: Deploy

Klicke auf "Deploy" und warte bis der Build fertig ist.

## 📱 PWA Installation

Nach dem Deployment kann die App als PWA installiert werden:

**Mobile (Chrome/Safari):**
1. Öffne die App im Browser
2. Tippe auf "Zur Startseite hinzufügen"
3. Die App erscheint als Icon auf deinem Home-Screen

**Desktop (Chrome/Edge):**
1. Klicke auf das Install-Icon in der Adressleiste
2. Oder: Menü → "App installieren"

## 🔑 API-Key Konfiguration

Die App benötigt einen OpenAI API-Key. Es gibt zwei Möglichkeiten:

### Option A: Environment Variables (Empfohlen für Production)

1. Kopiere `.env.example` zu `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Trage deine API-Keys in `.env.local` ein:
   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=sk-...
   NEXT_PUBLIC_ELEVENLABS_API_KEY=sk_...  # Optional für TTS
   ```

3. Die Keys werden automatisch geladen (kein User-Input nötig)

**Dokploy Deployment:**
- Setze die Environment Variables im Dokploy Dashboard
- Gehe zu deinem Projekt → Settings → Environment Variables
- Füge hinzu:
  - `NEXT_PUBLIC_OPENAI_API_KEY`: dein OpenAI Key
  - `NEXT_PUBLIC_ELEVENLABS_API_KEY`: dein ElevenLabs Key (optional)

### Option B: User-Input (Fallback)

Wenn keine Environment Variables gesetzt sind:
1. Die App fragt beim ersten Start nach dem Key
2. Der Key wird lokal im Browser gespeichert (localStorage)
3. Du kannst den Key jederzeit über "API-Key ändern" aktualisieren

**Wichtig:** 
- `.env.local` wird NICHT in Git committed
- Nur `.env.example` (ohne echte Keys) ist im Repository

## 📁 Projektstruktur

```
web/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Startseite (Charakterauswahl)
│   └── chat/[id]/         # Chat-Seite
├── components/            # React Komponenten
├── constants/             # Charakter-Daten
├── context/               # React Context (Settings)
├── lib/                   # Services (OpenAI)
├── types/                 # TypeScript Types
├── public/                # Statische Assets
│   └── manifest.json      # PWA Manifest
├── Dockerfile             # Docker Konfiguration
└── next.config.ts         # Next.js Config
```

## 🎮 Verwendung

1. **Charakterauswahl**: Wähle einen Charakter aus 11 verfügbaren Charakteren
2. **Story beginnen**: Der Charakter begrüßt dich und die Story beginnt
3. **Interaktion**: Schreibe deine Aktionen und Antworten
4. **KI-Response**: Der Charakter antwortet im Character und entwickelt die Story weiter

## ⚙️ Einstellungen

- **API-Key**: OpenAI API-Key eingeben/ändern
- **Text-to-Speech**: Browser TTS aktivieren (optional)

## 🔧 Troubleshooting

### Build Fehler

```bash
# Node modules neu installieren
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Fehler

```bash
# Type Check
npm run build
```

### Docker Build Fehler

```bash
# Cache leeren und neu bauen
docker build --no-cache -t demon-slayer-chat .
```

## 📄 Lizenz

MIT License

## 👨‍💻 Autor

**Winterhuder79**
- GitHub: [@Winterhuder79](https://github.com/Winterhuder79)

---

⚠️ **Disclaimer**: Dies ist ein Fan-Projekt und nicht offiziell mit Demon Slayer / Kimetsu no Yaiba affiliiert.
