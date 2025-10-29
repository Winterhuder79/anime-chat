export interface Settings {
  apiKey: string;
  useTTS: boolean;
  ttsProvider: 'browser' | 'openai' | 'elevenlabs';
  elevenLabsApiKey?: string;
  voiceId?: string;
}
