import * as Speech from 'expo-speech';

export interface TTSOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  voice?: string;
}

export class TTSService {
  private static isSpeaking = false;
  private static currentUtterance: string | null = null;

  /**
   * Spricht einen Text aus
   */
  static async speak(text: string, options: TTSOptions = {}): Promise<void> {
    try {
      // Stoppe vorherige Wiedergabe
      if (this.isSpeaking) {
        await this.stop();
      }

      const {
        language = 'de-DE',
        pitch = 1.0,
        rate = 1.0,
        volume = 1.0,
        voice,
      } = options;

      this.currentUtterance = text;
      this.isSpeaking = true;

      await Speech.speak(text, {
        language,
        pitch,
        rate,
        volume,
        voice,
        onDone: () => {
          this.isSpeaking = false;
          this.currentUtterance = null;
        },
        onStopped: () => {
          this.isSpeaking = false;
          this.currentUtterance = null;
        },
        onError: (error) => {
          console.error('TTS Error:', error);
          this.isSpeaking = false;
          this.currentUtterance = null;
        },
      });
    } catch (error) {
      console.error('TTS speak error:', error);
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  /**
   * Stoppt die aktuelle Wiedergabe
   */
  static async stop(): Promise<void> {
    try {
      await Speech.stop();
      this.isSpeaking = false;
      this.currentUtterance = null;
    } catch (error) {
      console.error('TTS stop error:', error);
    }
  }

  /**
   * Pausiert die Wiedergabe
   */
  static async pause(): Promise<void> {
    try {
      await Speech.pause();
    } catch (error) {
      console.error('TTS pause error:', error);
    }
  }

  /**
   * Setzt die Wiedergabe fort
   */
  static async resume(): Promise<void> {
    try {
      await Speech.resume();
    } catch (error) {
      console.error('TTS resume error:', error);
    }
  }

  /**
   * Prüft ob gerade gesprochen wird
   */
  static getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  /**
   * Gibt den aktuellen Text zurück
   */
  static getCurrentUtterance(): string | null {
    return this.currentUtterance;
  }

  /**
   * Gibt verfügbare Stimmen zurück
   */
  static async getAvailableVoices(): Promise<Speech.Voice[]> {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      // Filtere nur deutsche Stimmen
      return voices.filter((voice) =>
        voice.language.toLowerCase().startsWith('de')
      );
    } catch (error) {
      console.error('Error getting voices:', error);
      return [];
    }
  }
}
