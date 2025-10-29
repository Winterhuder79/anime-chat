import { StackNavigationProp } from '@react-navigation/stack';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useSettings } from '../context/SettingsContext';
import { TTSService } from '../services/tts.service';
import { UniversalTTSService } from '../services/universalTTS.service';
import { ELEVENLABS_VOICES, OPENAI_VOICES } from '../types/Settings';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../constants/theme';

type RootStackParamList = {
  CharacterSelection: undefined;
  Story: any;
  Settings: undefined;
};

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { settings, updateSettings } = useSettings();
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    const voices = await TTSService.getAvailableVoices();
    setAvailableVoices(voices);
  };

  const handleTestSpeech = async () => {
    if (isTesting) return;
    
    setIsTesting(true);
    await UniversalTTSService.speak({
      provider: settings.tts.provider,
      text: 'Dies ist ein Test der Sprachausgabe für die Demon Slayer App.',
      rate: settings.tts.rate,
      pitch: settings.tts.pitch,
      volume: settings.tts.volume,
      voice: settings.tts.voice,
      language: settings.tts.language,
      elevenlabsVoiceId: settings.tts.elevenlabsVoiceId,
      openaiVoiceId: settings.tts.openaiVoiceId,
    });
    
    setTimeout(() => setIsTesting(false), 3000);
  };

  const handleVoiceSelect = (voiceIdentifier: string) => {
    updateSettings({
      tts: { ...settings.tts, voice: voiceIdentifier },
    });
  };

  const handleElevenLabsVoiceSelect = (voiceId: string) => {
    updateSettings({
      tts: { ...settings.tts, elevenlabsVoiceId: voiceId },
    });
  };

  const handleOpenAIVoiceSelect = (voiceId: string) => {
    updateSettings({
      tts: { ...settings.tts, openaiVoiceId: voiceId },
    });
  };

  const handleProviderChange = (provider: 'native' | 'elevenlabs' | 'openai') => {
    updateSettings({
      tts: { ...settings.tts, provider },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Zurück</Text>
          </TouchableOpacity>
          <Text style={styles.title}>⚙️ Einstellungen</Text>
        </View>

        {/* TTS Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔊 Text-to-Speech</Text>

          {/* Provider Selection */}
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>🎤 TTS-Anbieter</Text>
          </View>
          <View style={styles.providerContainer}>
            <TouchableOpacity
              style={[
                styles.providerButton,
                settings.tts.provider === 'native' && styles.providerButtonActive,
              ]}
              onPress={() => handleProviderChange('native')}
            >
              <Text
                style={[
                  styles.providerButtonText,
                  settings.tts.provider === 'native' && styles.providerButtonTextActive,
                ]}
              >
                📱 Native
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.providerButton,
                settings.tts.provider === 'elevenlabs' && styles.providerButtonActive,
              ]}
              onPress={() => handleProviderChange('elevenlabs')}
            >
              <Text
                style={[
                  styles.providerButtonText,
                  settings.tts.provider === 'elevenlabs' && styles.providerButtonTextActive,
                ]}
              >
                🎭 ElevenLabs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.providerButton,
                settings.tts.provider === 'openai' && styles.providerButtonActive,
              ]}
              onPress={() => handleProviderChange('openai')}
            >
              <Text
                style={[
                  styles.providerButtonText,
                  settings.tts.provider === 'openai' && styles.providerButtonTextActive,
                ]}
              >
                🤖 OpenAI
              </Text>
            </TouchableOpacity>
          </View>

          {/* Enable/Disable */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingText}>Vorlesen aktivieren</Text>
              <Text style={styles.settingDescription}>
                Automatisches Vorlesen aller Nachrichten
              </Text>
            </View>
            <Switch
              value={settings.tts.enabled}
              onValueChange={(value) =>
                updateSettings({ tts: { ...settings.tts, enabled: value } })
              }
              trackColor={{ false: COLORS.ui.border, true: COLORS.accent.gold }}
              thumbColor={settings.tts.enabled ? COLORS.accent.gold : '#f4f3f4'}
            />
          </View>

          {/* Speed Slider */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingText}>
                Sprechgeschwindigkeit: {settings.tts.rate.toFixed(1)}x
              </Text>
              <Text style={styles.settingDescription}>
                Langsamer ← → Schneller
              </Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            value={settings.tts.rate}
            onValueChange={(value) =>
              updateSettings({ tts: { ...settings.tts, rate: value } })
            }
            minimumTrackTintColor={COLORS.accent.gold}
            maximumTrackTintColor={COLORS.ui.border}
            thumbTintColor={COLORS.accent.gold}
          />

          {/* Volume Slider */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingText}>
                Lautstärke: {Math.round(settings.tts.volume * 100)}%
              </Text>
              <Text style={styles.settingDescription}>Leise ← → Laut</Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0.0}
            maximumValue={1.0}
            step={0.1}
            value={settings.tts.volume}
            onValueChange={(value) =>
              updateSettings({ tts: { ...settings.tts, volume: value } })
            }
            minimumTrackTintColor={COLORS.accent.gold}
            maximumTrackTintColor={COLORS.ui.border}
            thumbTintColor={COLORS.accent.gold}
          />

          {/* Voice Selection - Native */}
          {settings.tts.provider === 'native' && availableVoices.length > 0 && (
            <>
              <View style={styles.settingRow}>
                <Text style={styles.settingText}>🎤 Stimme auswählen</Text>
              </View>
              <View style={styles.voiceList}>
                {availableVoices.map((voice) => (
                  <TouchableOpacity
                    key={voice.identifier}
                    style={[
                      styles.voiceOption,
                      settings.tts.voice === voice.identifier &&
                        styles.voiceOptionSelected,
                    ]}
                    onPress={() => handleVoiceSelect(voice.identifier)}
                  >
                    <Text
                      style={[
                        styles.voiceOptionText,
                        settings.tts.voice === voice.identifier &&
                          styles.voiceOptionTextSelected,
                      ]}
                    >
                      {settings.tts.voice === voice.identifier ? '✓ ' : ''}
                      {voice.name}
                    </Text>
                    <Text style={styles.voiceLanguage}>{voice.language}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Voice Selection - ElevenLabs */}
          {settings.tts.provider === 'elevenlabs' && (
            <>
              <View style={styles.settingRow}>
                <Text style={styles.settingText}>🎭 ElevenLabs Stimme</Text>
              </View>
              <View style={styles.voiceList}>
                {ELEVENLABS_VOICES.map((voice) => (
                  <TouchableOpacity
                    key={voice.id}
                    style={[
                      styles.voiceOption,
                      settings.tts.elevenlabsVoiceId === voice.id &&
                        styles.voiceOptionSelected,
                    ]}
                    onPress={() => handleElevenLabsVoiceSelect(voice.id)}
                  >
                    <Text
                      style={[
                        styles.voiceOptionText,
                        settings.tts.elevenlabsVoiceId === voice.id &&
                          styles.voiceOptionTextSelected,
                      ]}
                    >
                      {settings.tts.elevenlabsVoiceId === voice.id ? '✓ ' : ''}
                      {voice.name}
                    </Text>
                    <Text style={styles.voiceLanguage}>{voice.language}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Voice Selection - OpenAI */}
          {settings.tts.provider === 'openai' && (
            <>
              <View style={styles.settingRow}>
                <Text style={styles.settingText}>🤖 OpenAI Stimme</Text>
              </View>
              <View style={styles.voiceList}>
                {OPENAI_VOICES.map((voice) => (
                  <TouchableOpacity
                    key={voice.id}
                    style={[
                      styles.voiceOption,
                      settings.tts.openaiVoiceId === voice.id &&
                        styles.voiceOptionSelected,
                    ]}
                    onPress={() => handleOpenAIVoiceSelect(voice.id)}
                  >
                    <Text
                      style={[
                        styles.voiceOptionText,
                        settings.tts.openaiVoiceId === voice.id &&
                          styles.voiceOptionTextSelected,
                      ]}
                    >
                      {settings.tts.openaiVoiceId === voice.id ? '✓ ' : ''}
                      {voice.name}
                    </Text>
                    <Text style={styles.voiceLanguage}>{voice.language}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Test Button */}
          <TouchableOpacity
            style={[styles.testButton, isTesting && styles.testButtonDisabled]}
            onPress={handleTestSpeech}
            disabled={isTesting}
          >
            <Text style={styles.testButtonText}>
              {isTesting ? '🔊 Spricht...' : '🔊 Test-Wiedergabe'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Story Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Story-Einstellungen</Text>

          {/* Text Length Slider */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingText}>
                Text-Länge: {settings.story.maxTokens} Tokens
              </Text>
              <Text style={styles.settingDescription}>
                {settings.story.maxTokens <= 200 && 'Kurz & Knapp'}
                {settings.story.maxTokens > 200 && settings.story.maxTokens <= 400 && 'Normal'}
                {settings.story.maxTokens > 400 && 'Ausführlich'}
              </Text>
            </View>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={100}
            maximumValue={800}
            step={50}
            value={settings.story.maxTokens}
            onValueChange={(value) =>
              updateSettings({ story: { ...settings.story, maxTokens: value } })
            }
            minimumTrackTintColor={COLORS.accent.gold}
            maximumTrackTintColor={COLORS.ui.border}
            thumbTintColor={COLORS.accent.gold}
          />
          <View style={styles.tokenInfo}>
            <Text style={styles.tokenInfoText}>
              💡 Kürzere Texte = Schnellere Antworten & Weniger Kosten
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          {settings.tts.provider === 'native' && (
            <Text style={styles.infoText}>
              📱 Native TTS nutzt die System-Stimmen deines Geräts. Kostenlos und offline verfügbar.
            </Text>
          )}
          {settings.tts.provider === 'elevenlabs' && (
            <Text style={styles.infoText}>
              🎭 ElevenLabs bietet Premium-Qualität Stimmen mit natürlicher Betonung. 
              Benötigt Internet und verbraucht API-Credits (~$0.30/1000 Zeichen).
            </Text>
          )}
          {settings.tts.provider === 'openai' && (
            <Text style={styles.infoText}>
              🤖 OpenAI TTS bietet hochwertige, natürlich klingende Stimmen. 
              Benötigt Internet (~$15/1M Zeichen).
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ui.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.ui.surface,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent.gold,
  },
  backButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  backButtonText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.accent.gold,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    fontSize: FONTS.sizes.title,
    fontWeight: 'bold',
    color: COLORS.ui.text,
    textAlign: 'center',
    marginRight: SPACING.xl * 2,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.ui.text,
    marginBottom: SPACING.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  settingLabel: {
    flex: 1,
    marginRight: SPACING.md,
  },
  settingText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.ui.text,
    marginBottom: SPACING.xs,
  },
  settingDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: SPACING.lg,
  },
  voiceList: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  voiceOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.ui.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.ui.border,
    marginBottom: SPACING.sm,
  },
  voiceOptionSelected: {
    backgroundColor: COLORS.ui.surface,
    borderColor: COLORS.accent.gold,
  },
  voiceOptionText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.ui.text,
    flex: 1,
  },
  voiceOptionTextSelected: {
    fontWeight: 'bold',
    color: COLORS.accent.gold,
  },
  voiceLanguage: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
  },
  testButton: {
    backgroundColor: COLORS.accent.gold,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  testButtonDisabled: {
    opacity: 0.5,
  },
  testButtonText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: 'bold',
    color: COLORS.ui.background,
  },
  infoSection: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.ui.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent.gold,
  },
  infoText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
    lineHeight: 20,
  },
  providerContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  providerButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.ui.surfaceLight,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.ui.border,
    alignItems: 'center',
  },
  providerButtonActive: {
    backgroundColor: COLORS.ui.surface,
    borderColor: COLORS.accent.gold,
  },
  providerButtonText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.ui.textSecondary,
  },
  providerButtonTextActive: {
    color: COLORS.accent.gold,
  },
  tokenInfo: {
    backgroundColor: COLORS.ui.surfaceLight,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.sm,
  },
  tokenInfoText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
    textAlign: 'center',
  },
});
