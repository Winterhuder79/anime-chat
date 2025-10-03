# 🗾 Anime Chat - Demon Slayer Interactive Story App

Eine interaktive React Native iOS App, bei der du in die Rolle deiner Lieblingscharaktere aus Demon Slayer schlüpfst und durch deine Chat-Eingaben die Story beeinflusst. OpenAI generiert dynamische Reaktionen basierend auf deinem gewählten Charakter und deinen Aktionen.

## 🎮 Features

- **12 spielbare Charaktere**: 7 Helden (Tanjiro, Nezuko, Zenitsu, Inosuke, Giyu, Shinobu, Rengoku) und 5 Dämonen (Muzan, Akaza, Daki, Gyutaro, Enmu)
- **KI-gesteuerte Stories**: OpenAI GPT-4 generiert dynamische, kontextbewusste Reaktionen
- **Charakterspezifisch**: Jeder Charakter hat eigene Fähigkeiten, Persönlichkeit und Sprechstil
- **Interaktive Fähigkeiten-Übersicht**: Zeigt verfügbare Techniken und Breathing Styles
- **Persistente Speicherung**: API-Key wird sicher gespeichert
- **Schönes UI**: Dunkles Demon Slayer-themed Design

## 📋 Voraussetzungen

- Node.js (v18 oder höher)
- npm oder yarn
- Xcode (für iOS)
- CocoaPods
- OpenAI API-Key ([hier erhalten](https://platform.openai.com/api-keys))

## 🚀 Installation

1. **Dependencies installieren:**
```bash
npm install
```

2. **iOS Pods installieren:**
```bash
cd ios
pod install
cd ..
```

3. **babel-plugin-module-resolver installieren (falls nicht automatisch installiert):**
```bash
npm install --save-dev babel-plugin-module-resolver
```

## 🎯 App starten

### iOS Simulator
```bash
npm run ios
```

### iOS auf echtem Gerät
```bash
npm run ios -- --device "Dein iPhone Name"
```

### Metro Bundler manuell starten
```bash
npm start
```

## 🔑 OpenAI API-Key einrichten

Beim ersten Start der App wirst du aufgefordert, deinen OpenAI API-Key einzugeben.

1. Gehe zu [OpenAI Platform](https://platform.openai.com/api-keys)
2. Erstelle einen neuen API-Key
3. Gib den Key in der App ein

Der Key wird sicher in AsyncStorage gespeichert und muss nur einmal eingegeben werden.

## 📱 Verwendung

1. **Charakter wählen**: Wähle einen Helden oder Dämon aus der Übersicht
2. **Story beginnt**: Eine initiale Situation wird generiert
3. **Interagieren**: Schreibe, was dein Charakter sagt oder tut
4. **Story entwickelt sich**: Die KI reagiert auf deine Aktionen
5. **Fähigkeiten ansehen**: Tippe auf ⚡ um Charakterfähigkeiten zu sehen
6. **Neu starten**: Tippe auf 🔄 um die Story zurückzusetzen

## 🏗️ Projektstruktur

```
anime-chat/
├── src/
│   ├── types/              # TypeScript Type Definitions
│   │   ├── Character.ts
│   │   └── Story.ts
│   ├── constants/          # Charakterdaten
│   │   └── characters.ts
│   ├── services/           # API Services
│   │   └── openai.service.ts
│   ├── hooks/              # Custom React Hooks
│   │   └── useChat.ts
│   ├── components/         # Wiederverwendbare Komponenten
│   │   ├── CharacterCard.tsx
│   │   ├── ChatBubble.tsx
│   │   └── AbilityPanel.tsx
│   └── screens/            # App Screens
│       ├── CharacterSelectionScreen.tsx
│       └── StoryScreen.tsx
├── App.tsx                 # Main App Component
├── index.js               # Entry Point
└── package.json
```

## 🎨 Technologie-Stack

- **React Native 0.73**: Cross-platform Mobile Framework
- **TypeScript**: Type Safety
- **React Navigation**: Navigation zwischen Screens
- **AsyncStorage**: Lokale Datenspeicherung
- **Axios**: HTTP Client für OpenAI API
- **OpenAI GPT-4**: KI für Story-Generierung

## 🔧 Entwicklung

### Linting
```bash
npm run lint
```

### Formatierung
```bash
npm run format
```

### TypeScript Check
```bash
npx tsc --noEmit
```

## 📝 Charaktere

### Helden (7)
- **Tanjiro Kamado** - Träger des Sonnen-Atems
- **Nezuko Kamado** - Der Dämon, der die Sonne eroberte
- **Zenitsu Agatsuma** - Der Donnerblitz
- **Inosuke Hashibira** - Der König der Berge
- **Giyu Tomioka** - Wasser-Hashira
- **Shinobu Kocho** - Insekten-Hashira
- **Kyojuro Rengoku** - Flammen-Hashira

### Dämonen (5)
- **Muzan Kibutsuji** - Dämonenkönig
- **Akaza** - Oberer Mond Drei
- **Daki** - Oberer Mond Sechs
- **Gyutaro** - Oberer Mond Sechs
- **Enmu** - Unterer Mond Eins

## 💡 Tipps für beste Ergebnisse

1. **Sei spezifisch**: Beschreibe genau, was dein Charakter tut
2. **Nutze Fähigkeiten**: Verwende die charakterspezifischen Techniken
3. **Bleib im Charakter**: Agiere wie der gewählte Charakter
4. **Kreativ sein**: Die KI passt sich an deine Kreativität an

## ⚠️ Bekannte Limitierungen

- Nur für iOS optimiert
- Benötigt OpenAI API-Key (kostenpflichtig)
- Internet-Verbindung erforderlich
- GPT-4 Rate Limits beachten

## 🔮 Zukünftige Features

- [ ] Android Support
- [ ] Offline-Modus mit vordefinierten Szenarien
- [ ] Geschichte speichern und teilen
- [ ] Mehr Charaktere
- [ ] Multiplayer-Modus
- [ ] Charakter-Leveling System
- [ ] Datenbank-Integration

## 📄 Lizenz

Dieses Projekt ist ein Fan-Projekt und nicht kommerziell. Demon Slayer gehört Koyoharu Gotouge und ufotable.

## 🤝 Beitragen

Contributions sind willkommen! Bitte erstelle einen Pull Request oder Issue.

## 📧 Support

Bei Fragen oder Problemen, bitte ein GitHub Issue erstellen.

---

Viel Spaß beim Erkunden der Demon Slayer Welt! 🗡️✨
