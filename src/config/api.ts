// ⚠️ WARNUNG: NUR FÜR ENTWICKLUNG! 
// In Production sollte der API-Key NIEMALS im Code stehen!

export const DEV_CONFIG = {
  // ⚠️ API-Key hardcoded für Tests mit Expo Go
  OPENAI_API_KEY: 'your-openai-api-key-here',
  
  // true = Nutze hardcodierten Key, false = Frage nach Key
  USE_HARDCODED_KEY: true,
  
  // false = Direkt zu OpenAI (für Expo Go), true = Über Proxy
  USE_PROXY: false,
};
