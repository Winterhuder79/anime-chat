export type TTSProvider = 'native' | 'elevenlabs' | 'openai';

export interface TTSSettings {
  enabled: boolean;
  provider: TTSProvider; // 'native', 'elevenlabs' oder 'openai'
  rate: number; // 0.5 - 2.0
  pitch: number; // 0.5 - 2.0
  volume: number; // 0.0 - 1.0
  voice?: string;
  language: string;
  elevenlabsVoiceId?: string; // ElevenLabs Voice ID
  openaiVoiceId?: string; // OpenAI Voice ID
}

export interface StorySettings {
  maxTokens: number; // 100 - 800 (Text-Länge)
}

export interface AppSettings {
  tts: TTSSettings;
  story: StorySettings;
}

export const DEFAULT_SETTINGS: AppSettings = {
  tts: {
    enabled: true,
    provider: 'native',
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
    language: 'de-DE',
    elevenlabsVoiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel (Weiblich, Klar) als Default
    openaiVoiceId: 'nova', // Nova (Weiblich) als Default
  },
  story: {
    maxTokens: 300, // Default: Mittlere Länge
  },
};

// ElevenLabs Voice IDs (Premium Deutsch)
export const ELEVENLABS_VOICES = [
  { id: 'qNkzaJoHLLdpvgh5tISm', name: 'Carter the Mountain King (Episch)', language: 'en' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam (Männlich, Tief)', language: 'de' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel (Weiblich, Klar)', language: 'de' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi (Weiblich, Stark)', language: 'de' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella (Weiblich, Weich)', language: 'de' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli (Weiblich, Emotional)', language: 'de' },
  { id: 'TX3LPaxmHKxFdv7VOQHJ', name: 'Liam (Männlich, Natürlich)', language: 'de' },
];

// OpenAI TTS Voices (Premium)
export const OPENAI_VOICES = [
  { id: 'alloy', name: 'Alloy (Neutral)', language: 'en' },
  { id: 'echo', name: 'Echo (Männlich)', language: 'en' },
  { id: 'fable', name: 'Fable (Britisch)', language: 'en' },
  { id: 'onyx', name: 'Onyx (Tief, Männlich)', language: 'en' },
  { id: 'nova', name: 'Nova (Weiblich)', language: 'en' },
  { id: 'shimmer', name: 'Shimmer (Weiblich, Weich)', language: 'en' },
];
