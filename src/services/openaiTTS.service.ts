import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import { DEV_CONFIG } from '../config/api';

export interface OpenAITTSOptions {
  voiceId: string;
  text: string;
  model?: 'tts-1' | 'tts-1-hd';
  speed?: number; // 0.25 - 4.0
}

export class OpenAITTSService {
  private static sound: Audio.Sound | null = null;
  private static isPlaying = false;
  private static currentText: string | null = null;
  private static apiKey: string = DEV_CONFIG.OPENAI_API_KEY;

  /**
   * Setzt den API-Key
   */
  static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generiert und spielt Audio von OpenAI TTS ab
   */
  static async speak(options: OpenAITTSOptions): Promise<void> {
    const { voiceId, text, model = 'tts-1', speed = 1.0 } = options;

    try {
      // Stoppe vorherige Wiedergabe
      await this.stop();

      this.currentText = text;
      this.isPlaying = true;

      // Generiere Cache-Key
      const cacheKey = this.getCacheKey(text, voiceId);
      const cacheUri = `${FileSystem.cacheDirectory}${cacheKey}.mp3`;

      // Prüfe Cache
      const cached = await FileSystem.getInfoAsync(cacheUri);
      let audioUri: string;

      if (cached.exists) {
        console.log('🎵 Using cached OpenAI TTS audio');
        audioUri = cacheUri;
      } else {
        console.log('🌐 Fetching audio from OpenAI TTS...');
        audioUri = await this.fetchAudio(voiceId, text, model, speed, cacheUri);
      }

      // Spiele Audio ab
      await this.playAudio(audioUri);
    } catch (error) {
      console.error('OpenAI TTS Error:', error);
      this.isPlaying = false;
      this.currentText = null;
      throw error;
    }
  }

  /**
   * Holt Audio von OpenAI TTS API
   */
  private static async fetchAudio(
    voiceId: string,
    text: string,
    model: string,
    speed: number,
    cacheUri: string
  ): Promise<string> {
    const url = 'https://api.openai.com/v1/audio/speech';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        voice: voiceId,
        input: text,
        speed,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI TTS API Error: ${response.status} - ${error}`);
    }

    // Speichere Audio im Cache
    const base64 = await response.blob().then(blob => 
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
    );

    await FileSystem.writeAsStringAsync(cacheUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return cacheUri;
  }

  /**
   * Spielt Audio-Datei ab
   */
  private static async playAudio(uri: string): Promise<void> {
    try {
      console.log('🎵 Configuring audio mode...');
      
      // Konfiguriere Audio-Modus
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: 2,
        interruptionModeAndroid: 1,
      });

      console.log('🎵 Loading OpenAI TTS audio from:', uri);

      // Lade Sound
      const { sound, status } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        this.onPlaybackStatusUpdate.bind(this)
      );

      this.sound = sound;
      
      console.log('🎵 Audio loaded, status:', status);
      console.log('🎵 Starting playback...');
      
      // Setze Lautstärke auf Maximum
      await sound.setVolumeAsync(1.0);
      
      // Spiele ab
      await sound.playAsync();
      
      console.log('✅ OpenAI TTS playback started successfully');
    } catch (error) {
      console.error('❌ OpenAI TTS playback error:', error);
      this.isPlaying = false;
      throw error;
    }
  }

  /**
   * Callback für Playback-Status
   */
  private static onPlaybackStatusUpdate(status: any) {
    if (status.didJustFinish) {
      console.log('✅ OpenAI TTS playback finished');
      this.isPlaying = false;
      this.currentText = null;
      if (this.sound) {
        this.sound.unloadAsync();
        this.sound = null;
      }
    }
    
    if (status.error) {
      console.error('❌ OpenAI TTS playback error:', status.error);
      this.isPlaying = false;
    }
  }

  /**
   * Stoppt die Wiedergabe
   */
  static async stop(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
      }
      this.isPlaying = false;
      this.currentText = null;
    } catch (error) {
      console.error('Stop error:', error);
    }
  }

  /**
   * Pausiert die Wiedergabe
   */
  static async pause(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.pauseAsync();
      }
    } catch (error) {
      console.error('Pause error:', error);
    }
  }

  /**
   * Setzt die Wiedergabe fort
   */
  static async resume(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.playAsync();
      }
    } catch (error) {
      console.error('Resume error:', error);
    }
  }

  /**
   * Gibt zurück ob gerade gesprochen wird
   */
  static getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Gibt den aktuellen Text zurück
   */
  static getCurrentText(): string | null {
    return this.currentText;
  }

  /**
   * Generiert Cache-Key
   */
  private static getCacheKey(text: string, voiceId: string): string {
    // Einfacher Hash
    const hash = text.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    return `openai_tts_${voiceId}_${Math.abs(hash)}`;
  }

  /**
   * Löscht den Audio-Cache
   */
  static async clearCache(): Promise<void> {
    try {
      const cacheDir = FileSystem.cacheDirectory;
      if (cacheDir) {
        const files = await FileSystem.readDirectoryAsync(cacheDir);
        const audioFiles = files.filter((f: string) => f.startsWith('openai_tts_'));
        
        for (const file of audioFiles) {
          await FileSystem.deleteAsync(`${cacheDir}${file}`, { idempotent: true });
        }
        
        console.log(`🗑️ Cleared ${audioFiles.length} cached OpenAI TTS audio files`);
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}
