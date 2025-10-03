# 🗡️ Demon Slayer Interactive Chat App

Eine interaktive React Native App, die im Demon Slayer Universum spielt. Übernimm die Rolle eines Charakters und erlebe eine von KI generierte Story!

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

## ✨ Features

### 🎭 12 Spielbare Charaktere

**Demon Slayers:**
- 🔥 Tanjiro Kamado - Wasser & Sonnen-Atem
- 👹 Nezuko Kamado - Dämon mit menschlicher Seele
- ⚡ Zenitsu Agatsuma - Donner-Atem Meister
- 🐗 Inosuke Hashibira - Bestien-Atem Kämpfer
- 🌊 Giyu Tomioka - Wasser-Hashira
- 🦋 Shinobu Kocho - Insekten-Hashira

**Dämonen:**
- 👑 Muzan Kibutsuji - Der erste Dämon
- 🕸️ Rui - Spinnen-Dämon
- 🥋 Akaza - Oberer Mond 3
- 💃 Daki - Oberer Mond 6
- 🎭 Gyutaro - Oberer Mond 6
- 🚂 Enmu - Unterer Mond 1

### 🎮 Gameplay

- **KI-generierte Stories** mit OpenAI GPT-4o
- **Interaktiver Chat** - Deine Entscheidungen formen die Story
- **Fähigkeiten-Panel** mit charakterspezifischen Moves
- **Deutsche Sprache** - Vollständig lokalisiert
- **Responsive Design** für Mobile optimiert

## 🚀 Installation

### Voraussetzungen

- Node.js (v16+)
- npm oder yarn
- Expo CLI
- OpenAI API Key

### Setup

1. **Repository klonen**
```bash
git clone https://github.com/Winterhuder79/anime-chat.git
cd anime-chat
```

2. **Dependencies installieren**
```bash
npm install
```

3. **API-Key konfigurieren**

**Option A: Hardcoded (nur für Entwicklung!)**
```typescript
// src/config/api.ts
export const DEV_CONFIG = {
  OPENAI_API_KEY: 'your-openai-api-key-here',
  USE_HARDCODED_KEY: true,
  USE_PROXY: false,
};
```

**Option B: Environment Variable**
```bash
cp .env.example .env
# Trage deinen API-Key in .env ein
```

4. **App starten**
```bash
npx expo start
```

5. **Auf Handy testen**
- Installiere **Expo Go** App
- Scanne QR-Code im Terminal

## 🛠️ Technologie-Stack

- **Framework**: React Native + Expo
- **Sprache**: TypeScript
- **State Management**: React Hooks
- **Navigation**: React Navigation
- **KI**: OpenAI GPT-4o API
- **HTTP Client**: Axios
- **Storage**: AsyncStorage

## 📱 App-Struktur

```
src/
├── components/          # UI-Komponenten
│   ├── AbilityPanel.tsx
│   ├── ApiKeyInput.tsx
│   ├── CharacterCard.tsx
│   └── ChatBubble.tsx
├── screens/            # Hauptscreens
│   ├── CharacterSelectionScreen.tsx
│   └── StoryScreen.tsx
├── hooks/              # Custom Hooks
│   └── useChat.ts
├── services/           # API Services
│   ├── openai.service.ts
│   └── openai-proxy.service.ts
├── types/              # TypeScript Types
│   ├── Character.ts
│   └── Story.ts
├── constants/          # Daten & Theme
│   ├── characters.ts
│   └── theme.ts
└── config/             # Konfiguration
    └── api.ts
```

## 🎨 Screenshots

> TODO: Screenshots hinzufügen

## 🔧 Entwicklung

### Neue Charaktere hinzufügen

1. Bearbeite `src/constants/characters.ts`
2. Füge Charakter-Daten hinzu:

```typescript
{
  id: 'character-id',
  name: 'Name',
  nameJapanese: '日本語',
  title: 'Titel',
  type: 'demon_slayer' | 'demon',
  personality: 'Beschreibung...',
  backstory: 'Geschichte...',
  voiceStyle: 'Sprechstil...',
  abilities: [...],
  strengths: [...],
  weaknesses: [...]
}
```

### Proxy-Server nutzen

Bei CORS-Problemen:

```bash
node proxy-server.js
```

Details in `PROXY-SETUP.md`

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details

## 🤝 Beitragen

Pull Requests sind willkommen! Für größere Änderungen bitte zuerst ein Issue öffnen.

## 👨‍💻 Autor

**Winterhuder79**
- GitHub: [@Winterhuder79](https://github.com/Winterhuder79)

## 🙏 Credits

- **Demon Slayer** von Koyoharu Gotouge
- **OpenAI** für GPT-4o API
- **Expo** für das Framework

---

⚠️ **Disclaimer**: Dies ist ein Fan-Projekt und nicht offiziell mit Demon Slayer / Kimetsu no Yaiba affiliiert.
