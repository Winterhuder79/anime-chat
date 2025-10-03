# VSCode Setup-Anleitung für React Native KI-Chat App

## ✅ Erstellte Konfigurationsdateien

Die folgenden Dateien wurden erfolgreich erstellt:

### `.vscode/` Verzeichnis

- **settings.json** - Editor-Einstellungen mit automatischer Formatierung
- **extensions.json** - Empfohlene VSCode-Extensions
- **launch.json** - Debug-Konfigurationen für Android/iOS
- **tasks.json** - Automatisierte Tasks für Development

### Root-Verzeichnis

- **.eslintrc.js** - Code-Qualitätsregeln für TypeScript & React Native
- **.prettierrc.js** - Code-Formatierungsregeln
- **tsconfig.json** - TypeScript-Konfiguration mit strikten Checks

## 📦 Erforderliche Extensions installieren

Beim nächsten Öffnen des Projekts wird VSCode dich fragen, ob du die empfohlenen Extensions installieren möchtest. Klicke auf **"Alle installieren"**.

Alternativ kannst du die Extensions manuell installieren:

1. Öffne die Extensions-Ansicht (Strg+Shift+X)
2. Suche und installiere folgende Extensions:

### Essential Extensions

- **React Native Tools** - Debugging & Development Support
- **ESLint** - Code-Qualitätsprüfung
- **Prettier** - Code-Formatierung
- **TypeScript** - Enhanced TypeScript Support

### Empfohlene Extensions

- **Error Lens** - Inline-Fehleranzeige
- **GitLens** - Git-Integration
- **Import Cost** - Bundle-Größe Anzeige
- **Path Intellisense** - Auto-Vervollständigung für Pfade
- **REST Client** - API-Testing

## 🚀 Projekt initialisieren

Führe folgende Befehle aus, um das React Native Projekt zu erstellen:

```bash
# React Native mit TypeScript initialisieren
npx react-native@latest init AnimeChatApp --template react-native-template-typescript

# Wechsel ins Projektverzeichnis (falls du noch nicht drin bist)
cd anime-chat

# Notwendige Dev-Dependencies installieren
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev eslint-config-prettier eslint-plugin-react-native
npm install --save-dev prettier
```

## 📝 package.json Scripts hinzufügen

Füge folgende Scripts zu deiner `package.json` hinzu:

```json
"scripts": {
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "start": "react-native start",
  "test": "jest",
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
  "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
  "type-check": "tsc --noEmit",
  "clean": "cd android && ./gradlew clean && cd .. && cd ios && xcodebuild clean && cd .."
}
```

## 🎯 Automatische Features

Nach der Installation sind folgende Features aktiv:

### ✨ Beim Speichern (Strg+S)

- ✅ Code wird automatisch formatiert (Prettier)
- ✅ ESLint-Fehler werden automatisch behoben
- ✅ Imports werden organisiert und sortiert
- ✅ Trailing Whitespaces werden entfernt

### 🔍 Während der Entwicklung

- ✅ TypeScript-Fehler werden live angezeigt
- ✅ ESLint-Warnungen erscheinen inline
- ✅ Auto-Imports für TypeScript
- ✅ IntelliSense für React Native Komponenten

### 🐛 Debugging

- ✅ Debug Android mit F5
- ✅ Debug iOS mit F5
- ✅ Breakpoints in TypeScript-Code
- ✅ Console-Logs im Debug-Panel

## 🎨 Code-Style Highlights

### TypeScript-Regeln

- Strikte Typ-Überprüfung aktiviert
- Keine `any` ohne Warnung
- Ungenutzte Variablen führen zu Fehlern
- Null-Checks erforderlich

### React Native Best Practices

- Keine inline-Styles (Warnung)
- Keine ungenutzten Styles
- Keine direkten Color-Literals
- React Hooks Rules werden enforced

### Code-Qualität

- `console.log` führt zu Warnung (nur `console.warn/error` erlaubt)
- `===` statt `==` erforderlich
- Template Literals bevorzugt
- Imports werden automatisch sortiert

## 📁 Empfohlene Projektstruktur

```
anime-chat/
├── src/
│   ├── components/     # Wiederverwendbare UI-Komponenten
│   ├── screens/        # App-Screens
│   ├── services/       # API & KI-Chat Services
│   │   └── ai/        # KI-Integration (OpenAI, etc.)
│   ├── navigation/     # React Navigation Setup
│   ├── hooks/          # Custom React Hooks
│   ├── utils/          # Helper-Funktionen
│   ├── types/          # TypeScript Typen/Interfaces
│   ├── constants/      # Konstanten & Config
│   └── theme/          # Farben, Fonts, Styles
├── App.tsx             # Root Component
└── index.js            # Entry Point
```

## 🔧 VSCode Tasks nutzen

Drücke `Strg+Shift+P` und tippe "Tasks: Run Task":

- **Start Metro Bundler** - Startet den Development Server
- **Run Android** - Startet die App auf Android
- **Run iOS** - Startet die App auf iOS
- **ESLint: Fix All Files** - Behebt alle ESLint-Fehler
- **TypeScript: Check Types** - Überprüft TypeScript-Typen
- **Run Tests** - Führt Jest-Tests aus

## 💡 Tipps

1. **Auto-Save aktivieren**: File > Preferences > Settings > suche "auto save" und setze auf "afterDelay"
2. **Format on Paste**: Aktiviere "Format On Paste" in den Settings
3. **Pfad-Aliase nutzen**: Verwende `@components/Button` statt `../../components/Button`
4. **Error Lens**: Zeigt Fehler direkt in der Zeile an - sehr hilfreich!

## 🔗 KI-Chat Integration

Für die KI-Chat-Funktionalität empfehle ich:

### Backend-Optionen

- **OpenAI API** - GPT-3.5/GPT-4 für fortgeschrittene Chats
- **Anthropic Claude** - Alternative zu OpenAI
- **Google Gemini** - Googles KI-API
- **Ollama** - Lokale KI-Modelle (für Entwicklung)

### Nützliche Packages

```bash
npm install axios          # HTTP-Requests
npm install @react-native-async-storage/async-storage  # Persistenz
npm install react-native-vector-icons  # Icons
npm install @react-navigation/native   # Navigation
```

## 📚 Weiterführende Ressourcen

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## ⚠️ Troubleshooting

### Metro Bundler Fehler

```bash
npm start -- --reset-cache
```

### Android Build Fehler

```bash
cd android && ./gradlew clean && cd ..
```

### iOS Build Fehler

```bash
cd ios && pod install && cd ..
```

### ESLint/TypeScript Fehler nach Installation

- Starte VSCode neu
- Führe `npm install` erneut aus
- Prüfe ob alle Extensions installiert sind

---

**Viel Erfolg beim Entwickeln deiner KI-Chat App! 🚀**
