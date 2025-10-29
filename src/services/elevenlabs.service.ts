import * as FileSystem from 'expo-file-system/legacy';
import { Audio } from 'expo-av';
import { DEV_CONFIG } from '../config/api';

export interface ElevenLabsOptions {
  voiceId: string;
  text: string;
  stability?: number;
  similarityBoost?: number;
}

export class ElevenLabsService {
  private static sound: Audio.Sound | null = null;
  private static isPlaying = false;
  private static currentText: string | null = null;
  private static apiKey: string = DEV_CONFIG.ELEVENLABS_API_KEY;

  /**
   * Setzt den API-Key
   */
  static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generiert und spielt Audio von ElevenLabs ab
   */
  static async speak(options: ElevenLabsOptions): Promise<void> {
    const { voiceId, text, stability = 0.5, similarityBoost = 0.75 } = options;

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
        console.log('🎵 Using cached audio');
        audioUri = cacheUri;
      } else {
        console.log('🌐 Fetching audio from ElevenLabs...');
        audioUri = await this.fetchAudio(voiceId, text, stability, similarityBoost, cacheUri);
      }

      // Spiele Audio ab
      await this.playAudio(audioUri);
    } catch (error) {
      console.error('ElevenLabs Error:', error);
      this.isPlaying = false;
      this.currentText = null;
      throw error;
    }
  }

  /**
   * Holt Audio von ElevenLabs API
   */
  private static async fetchAudio(
    voiceId: string,
    text: string,
    stability: number,
    similarityBoost: number,
    cacheUri: string
  ): Promise<string> {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability,
          similarity_boost: similarityBoost,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ElevenLabs API Error: ${response.status} - ${error}`);
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
      
      // Konfiguriere Audio-Modus für iOS Compatibility
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true, // WICHTIG: Verhindert Auto-Stop auf iOS!
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: 2, // DuckOthers statt DoNotMix
        interruptionModeAndroid: 1, // DoNotMix
      });

      console.log('🎵 Loading audio from:', uri);

      // Lade Sound
      const { sound, status } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false }, // Erst laden, dann manuell abspielen
        this.onPlaybackStatusUpdate.bind(this)
      );

      this.sound = sound;
      
      console.log('🎵 Audio loaded, status:', status);
      console.log('🎵 Starting playback...');
      
      // Setze Lautstärke auf Maximum
      await sound.setVolumeAsync(1.0);
      
      // Spiele ab
      await sound.playAsync();
      
      console.log('✅ Playback started successfully');
    } catch (error) {
      console.error('❌ Audio playback error:', error);
      this.isPlaying = false;
      throw error;
    }
  }

  /**
   * Callback für Playback-Status
   */
  private static onPlaybackStatusUpdate(status: any) {
    console.log('🎵 Playback status:', {
      isLoaded: status.isLoaded,
      isPlaying: status.isPlaying,
      didJustFinish: status.didJustFinish,
      positionMillis: status.positionMillis,
      durationMillis: status.durationMillis,
    });
    
    if (status.didJustFinish) {
      console.log('✅ Playback finished');
      this.isPlaying = false;
      this.currentText = null;
      if (this.sound) {
        this.sound.unloadAsync();
        this.sound = null;
      }
    }
    
    if (status.error) {
      console.error('❌ Playback error:', status.error);
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
    return `elevenlabs_${voiceId}_${Math.abs(hash)}`;
  }

  /**
   * Löscht den Audio-Cache
   */
  static async clearCache(): Promise<void> {
    try {
      const cacheDir = FileSystem.cacheDirectory;
      if (cacheDir) {
        const files = await FileSystem.readDirectoryAsync(cacheDir);
        const audioFiles = files.filter((f: string) => f.startsWith('elevenlabs_'));
        
        for (const file of audioFiles) {
          await FileSystem.deleteAsync(`${cacheDir}${file}`, { idempotent: true });
        }
        
        console.log(`🗑️ Cleared ${audioFiles.length} cached audio files`);
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
}
