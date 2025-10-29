// ⚠️ WARNUNG: NUR FÜR ENTWICKLUNG! 
// In Production sollte der API-Key NIEMALS im Code stehen!

export const DEV_CONFIG = {
  // ⚠️ API-Key hardcoded für Tests mit Expo Go
  OPENAI_API_KEY: 'sk-R4RkmzHAITP9MMpiHeSCDP6kwcG16wtHso_IUDNwUST3BlbkFJNC8XJxOxXBm6vq524DYdp4mnYmjnC5UnBKEG47aRUA',
  
  // ElevenLabs API Key (optional)
  ELEVENLABS_API_KEY: 'sk_d0e230b9cef01c32a40d30cb61f90014f9fa71b3a7e5bd87',
  
  // true = Nutze hardcodierten Key, false = Frage nach Key
  USE_HARDCODED_KEY: true,
  
  // false = Direkt zu OpenAI (für Expo Go), true = Über Proxy
  USE_PROXY: false,
};
