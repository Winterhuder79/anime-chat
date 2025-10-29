import { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { UniversalTTSService } from '../services/universalTTS.service';

interface UseTTSProps {
  text: string;
  autoPlay?: boolean;
  messageId: string;
}

export const useTTS = ({ text, autoPlay = false, messageId }: UseTTSProps) => {
  const { settings } = useSettings();
  const hasSpoken = useRef(false);

  useEffect(() => {
    // Nur sprechen wenn:
    // 1. TTS aktiviert ist
    // 2. AutoPlay aktiviert ist
    // 3. Text vorhanden ist
    // 4. Noch nicht gesprochen wurde
    if (
      settings.tts.enabled &&
      autoPlay &&
      text &&
      !hasSpoken.current
    ) {
      hasSpoken.current = true;
      
      // Kleiner Delay damit der User die Nachricht erst sieht
      setTimeout(() => {
        UniversalTTSService.speak({
          provider: settings.tts.provider,
          text,
          rate: settings.tts.rate,
          pitch: settings.tts.pitch,
          volume: settings.tts.volume,
          voice: settings.tts.voice,
          language: settings.tts.language,
          elevenlabsVoiceId: settings.tts.elevenlabsVoiceId,
          openaiVoiceId: settings.tts.openaiVoiceId,
        });
      }, 500);
    }

    // Cleanup: Stoppe Wiedergabe wenn Komponente unmounted
    return () => {
      // Nur stoppen wenn diese Message gerade spricht
      if (UniversalTTSService.getCurrentUtterance(settings.tts.provider) === text) {
        UniversalTTSService.stop();
      }
    };
  }, [text, autoPlay, settings, messageId]);

  const speak = async () => {
    await UniversalTTSService.speak({
      provider: settings.tts.provider,
      text,
      rate: settings.tts.rate,
      pitch: settings.tts.pitch,
      volume: settings.tts.volume,
      voice: settings.tts.voice,
      language: settings.tts.language,
      elevenlabsVoiceId: settings.tts.elevenlabsVoiceId,
      openaiVoiceId: settings.tts.openaiVoiceId,
    });
  };

  const stop = async () => {
    await UniversalTTSService.stop();
  };

  const pause = async () => {
    await UniversalTTSService.pause(settings.tts.provider);
  };

  const resume = async () => {
    await UniversalTTSService.resume(settings.tts.provider);
  };

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking: UniversalTTSService.getIsSpeaking(settings.tts.provider),
    currentUtterance: UniversalTTSService.getCurrentUtterance(settings.tts.provider),
  };
};
