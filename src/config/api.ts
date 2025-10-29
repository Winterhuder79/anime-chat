import { OPENAI_API_KEY, ELEVENLABS_API_KEY } from '@env';

// Keys werden aus .env Datei geladen
export const DEV_CONFIG = {
  // API-Keys aus Environment-Variablen
  OPENAI_API_KEY: OPENAI_API_KEY || '',
  
  // ElevenLabs API Key (optional)
  ELEVENLABS_API_KEY: ELEVENLABS_API_KEY || '',
  
  // true = Nutze Environment Key, false = Frage nach Key
  USE_HARDCODED_KEY: !!OPENAI_API_KEY,
  
  // false = Direkt zu OpenAI (für Expo Go), true = Über Proxy
  USE_PROXY: false,
};
