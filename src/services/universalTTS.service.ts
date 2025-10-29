import { TTSService } from './tts.service';
import { ElevenLabsService } from './elevenlabs.service';
import { OpenAITTSService } from './openaiTTS.service';
import { TTSProvider } from '../types/Settings';

export interface UniversalTTSOptions {
  provider: TTSProvider;
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: string;
  language?: string;
  elevenlabsVoiceId?: string;
  openaiVoiceId?: string;
}

/**
 * Universeller TTS-Service der zwischen Native, ElevenLabs und OpenAI wechselt
 */
export class UniversalTTSService {
  /**
   * Spricht Text mit dem gewählten Provider aus
   */
  static async speak(options: UniversalTTSOptions): Promise<void> {
    const { provider } = options;

    if (provider === 'elevenlabs') {
      return this.speakElevenLabs(options);
    } else if (provider === 'openai') {
      return this.speakOpenAI(options);
    } else {
      return this.speakNative(options);
    }
  }

  /**
   * Spricht mit Native TTS
   */
  private static async speakNative(options: UniversalTTSOptions): Promise<void> {
    const { text, rate = 1.0, pitch = 1.0, volume = 0.8, voice, language = 'de-DE' } = options;

    await TTSService.speak(text, {
      rate,
      pitch,
      volume,
      voice,
      language,
    });
  }

  /**
   * Spricht mit ElevenLabs
   */
  private static async speakElevenLabs(options: UniversalTTSOptions): Promise<void> {
    const { text, elevenlabsVoiceId } = options;

    if (!elevenlabsVoiceId) {
      throw new Error('ElevenLabs Voice ID is required');
    }

    await ElevenLabsService.speak({
      voiceId: elevenlabsVoiceId,
      text,
    });
  }

  /**
   * Spricht mit OpenAI TTS
   */
  private static async speakOpenAI(options: UniversalTTSOptions): Promise<void> {
    const { text, openaiVoiceId, rate = 1.0 } = options;

    if (!openaiVoiceId) {
      throw new Error('OpenAI Voice ID is required');
    }

    await OpenAITTSService.speak({
      voiceId: openaiVoiceId,
      text,
      speed: rate, // Map rate to speed (OpenAI uses 0.25-4.0)
    });
  }

  /**
   * Stoppt die Wiedergabe (alle Provider)
   */
  static async stop(): Promise<void> {
    await Promise.all([
      TTSService.stop(),
      ElevenLabsService.stop(),
      OpenAITTSService.stop(),
    ]);
  }

  /**
   * Pausiert die Wiedergabe
   */
  static async pause(provider: TTSProvider): Promise<void> {
    if (provider === 'elevenlabs') {
      await ElevenLabsService.pause();
    } else if (provider === 'openai') {
      await OpenAITTSService.pause();
    } else {
      await TTSService.pause();
    }
  }

  /**
   * Setzt die Wiedergabe fort
   */
  static async resume(provider: TTSProvider): Promise<void> {
    if (provider === 'elevenlabs') {
      await ElevenLabsService.resume();
    } else if (provider === 'openai') {
      await OpenAITTSService.resume();
    } else {
      await TTSService.resume();
    }
  }

  /**
   * Prüft ob gerade gesprochen wird
   */
  static getIsSpeaking(provider: TTSProvider): boolean {
    if (provider === 'elevenlabs') {
      return ElevenLabsService.getIsPlaying();
    } else if (provider === 'openai') {
      return OpenAITTSService.getIsPlaying();
    } else {
      return TTSService.getIsSpeaking();
    }
  }

  /**
   * Gibt den aktuellen Text zurück
   */
  static getCurrentUtterance(provider: TTSProvider): string | null {
    if (provider === 'elevenlabs') {
      return ElevenLabsService.getCurrentText();
    } else if (provider === 'openai') {
      return OpenAITTSService.getCurrentText();
    } else {
      return TTSService.getCurrentUtterance();
    }
  }
}
