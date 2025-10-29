# 🔧 Proxy-Server Setup für Demon Slayer App

## Problem: API-Key ungültig (401 Error)

Der in der App verwendete API-Key ist **abgelaufen oder ungültig**. 

## ✅ Lösung: Proxy-Server

Ein lokaler Proxy-Server umgeht CORS-Probleme und verwaltet den API-Key sicher.

---

## 📋 Setup-Schritte:

### 1. Express & Dependencies installieren

```bash
cd d:\Coding\coden\anime-chat-expo
npm install express cors
```

### 2. API-Key in Proxy eintragen

Öffne `proxy-server.js` und setze deinen **GÜLTIGEN** OpenAI API-Key in Zeile 11:

```javascript
const OPENAI_API_KEY = 'sk-proj-DEIN_ECHTER_KEY_HIER';
```

**Wo bekomme ich einen API-Key?**
- Gehe zu: https://platform.openai.com/api-keys
- Erstelle einen neuen Key
- Kopiere den Key

### 3. Proxy-Server starten

**Neues Terminal öffnen** und ausführen:

```bash
cd d:\Coding\coden\anime-chat-expo
node proxy-server.js
```

Du solltest sehen:
```
🚀 Proxy Server läuft auf http://localhost:3001
📡 Endpoint: POST http://localhost:3001/api/chat
```

### 4. useChat Hook anpassen

Öffne `src/hooks/useChat.ts` und ändere Zeile 2:

```typescript
// ALT:
import { OpenAIService } from '../services/openai.service';

// NEU:
import { OpenAIProxyService as OpenAIService } from '../services/openai-proxy.service';
```

### 5. API-Key Konfiguration anpassen

Öffne `src/config/api.ts` und setze:

```typescript
export const DEV_CONFIG = {
  OPENAI_API_KEY: '', // Leer lassen!
  USE_HARDCODED_KEY: false, // Auf false setzen!
};
```

### 6. App neu laden

Im Expo Terminal drücke: `r`

---

## 🧪 Testen:

1. **Proxy läuft?** 
   - Terminal zeigt: "Proxy Server läuft"
   
2. **Expo läuft?**
   - Port 8082 aktiv
   
3. **App öffnen**:
   - Browser: http://localhost:8082
   - Handy: QR-Code scannen

4. **Charakter wählen** (z.B. Tanjiro 🔥)

5. **Story sollte starten!** ✨

---

## 📊 Terminal-Übersicht:

Du brauchst **2 Terminals**:

### Terminal 1: Proxy-Server
```bash
cd d:\Coding\coden\anime-chat-expo
node proxy-server.js

# Ausgabe:
# 🚀 Proxy Server läuft auf http://localhost:3001
# 📡 Endpoint: POST http://localhost:3001/api/chat
```

### Terminal 2: Expo
```bash
cd d:\Coding\coden\anime-chat-expo
npx expo start

# Ausgabe:
# › Metro waiting on exp://192.168.150.165:8082
```

---

## ⚠️ Troubleshooting:

### "Proxy-Server nicht erreichbar"
- Ist Terminal 1 noch offen?
- Läuft `node proxy-server.js`?
- Port 3001 frei?

### "401 Unauthorized"
- API-Key in `proxy-server.js` gesetzt?
- Ist der Key gültig?
- Teste auf: https://platform.openai.com/playground

### CORS-Fehler
- Proxy verwendet? (siehe Schritt 4)
- Proxy läuft auf Port 3001?

---

## 🎯 Schnell-Checklist:

- [ ] `npm install express cors` ausgeführt
- [ ] API-Key in `proxy-server.js` gesetzt (Zeile 11)
- [ ] Proxy-Server gestartet (`node proxy-server.js`)
- [ ] `useChat.ts` angepasst (Proxy-Service importieren)
- [ ] `config/api.ts` angepasst (USE_HARDCODED_KEY: false)
- [ ] Expo neu geladen (`r` drücken)
- [ ] Charakter ausgewählt & getestet

---

## 🔐 Sicherheit:

**WICHTIG:**
- ❌ Proxy nur für lokale Entwicklung!
- ❌ Nie in Production verwenden!
- ❌ API-Key nie committen!
- ✅ Für Production: Richtiges Backend bauen

---

## 📱 Alternative: Neuen API-Key testen

1. Erstelle neuen Key auf https://platform.openai.com/api-keys
2. Setze in `proxy-server.js` ein
3. Starte Proxy neu
4. Teste App

Viel Erfolg! 🗡️✨
