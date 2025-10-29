import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AbilityPanel } from '../components/AbilityPanel';
import { ChatBubble } from '../components/ChatBubble';
import { ApiKeyInput } from '../components/ApiKeyInput';
import { ActionButtons } from '../components/ActionButtons';
import { useChat } from '../hooks/useChat';
import { Character } from '../types/Character';
import { ChatMessage } from '../types/Story';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../constants/theme';
import { DEV_CONFIG } from '../config/api';

type RootStackParamList = {
  CharacterSelection: undefined;
  Story: { character: Character };
};

type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;
type StoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Story'
>;

interface Props {
  route: StoryScreenRouteProp;
  navigation: StoryScreenNavigationProp;
}

const API_KEY_STORAGE = '@anime_chat_api_key';

export const StoryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { character } = route.params;
  const [apiKey, setApiKey] = useState<string>('');
  const [inputText, setInputText] = useState('');
  const [showAbilities, setShowAbilities] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
    initialSituation,
    initializeStory,
  } = useChat({ character, apiKey });

  // Lade API-Key beim Start
  useEffect(() => {
    loadApiKey();
  }, []);

  // Initialisiere Story wenn API-Key geladen ist
  useEffect(() => {
    if (apiKey && !initialSituation) {
      initializeStory();
    }
  }, [apiKey, initialSituation, initializeStory]);

  // Scrolle zu neuesten Nachrichten
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const loadApiKey = async () => {
    try {
      // Verwende hardcodierten Key für Tests (wenn aktiviert)
      if (DEV_CONFIG.USE_HARDCODED_KEY && DEV_CONFIG.OPENAI_API_KEY) {
        console.log('🔑 Verwende hardcodierten API-Key für Tests');
        setApiKey(DEV_CONFIG.OPENAI_API_KEY);
        return;
      }

      const savedKey = await AsyncStorage.getItem(API_KEY_STORAGE);
      if (savedKey) {
        setApiKey(savedKey);
      } else {
        // Zeige API-Key Input Modal
        setShowApiKeyInput(true);
      }
    } catch (err) {
      console.error('Fehler beim Laden des API-Keys:', err);
      setShowApiKeyInput(true);
    }
  };

  const handleApiKeySubmit = async (key: string) => {
    try {
      await AsyncStorage.setItem(API_KEY_STORAGE, key);
      setApiKey(key);
      setShowApiKeyInput(false);
    } catch (err) {
      console.error('Fehler beim Speichern des API-Keys:', err);
    }
  };

  const handleApiKeyCancel = () => {
    setShowApiKeyInput(false);
    navigation.goBack();
  };

  const handleSend = async () => {
    if (inputText.trim() && !isLoading) {
      const message = inputText.trim();
      setInputText('');
      await sendMessage(message);
    }
  };

  const handleActionSelect = async (actionText: string) => {
    if (!isLoading) {
      await sendMessage(actionText, true); // true = isAction
    }
  };

  const handleReset = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Möchtest du die aktuelle Story wirklich neu starten?'
      );
      if (confirmed) {
        resetChat();
        initializeStory();
      }
    } else {
      Alert.alert(
        'Story zurücksetzen?',
        'Möchtest du die aktuelle Story wirklich neu starten?',
        [
          { text: 'Abbrechen', style: 'cancel' },
          {
            text: 'Zurücksetzen',
            style: 'destructive',
            onPress: () => {
              resetChat();
              initializeStory();
            },
          },
        ],
      );
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <ChatBubble message={item} characterName={character.name} />
  );

  const renderHeader = () => (
    <View style={styles.chatHeader}>
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>{character.name}</Text>
        <Text style={styles.characterTitle}>{character.title}</Text>
      </View>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowAbilities(true)}
        >
          <Text style={styles.iconText}>⚡</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Settings' as any)}
        >
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleReset}>
          <Text style={styles.iconText}>🔄</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={COLORS.accent.gold} />
          <Text style={styles.loadingText}>Die Welt reagiert...</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {renderHeader()}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />

        {/* Action Buttons */}
        <ActionButtons
          character={character}
          onActionSelect={handleActionSelect}
          disabled={isLoading}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Was tut ${character.name}?`}
            placeholderTextColor={COLORS.ui.textTertiary}
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={isLoading || !inputText.trim()}
          >
            <Text style={styles.sendButtonText}>
              {isLoading ? '⏳' : '📤'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ability Panel */}
        <AbilityPanel
          character={character}
          isVisible={showAbilities}
          onClose={() => setShowAbilities(false)}
        />

        {/* API Key Input Modal */}
        <ApiKeyInput
          visible={showApiKeyInput}
          onSubmit={handleApiKeySubmit}
          onCancel={handleApiKeyCancel}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ui.background,
  },
  keyboardView: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.ui.surface,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent.gold,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: 'bold',
    color: COLORS.ui.text,
  },
  characterTitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.ui.textSecondary,
    marginTop: SPACING.xs,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.ui.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent.gold,
  },
  iconText: {
    fontSize: 20,
  },
  errorContainer: {
    backgroundColor: COLORS.ui.error,
    padding: SPACING.md,
    margin: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  errorText: {
    color: COLORS.ui.text,
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
  },
  messagesContainer: {
    paddingVertical: SPACING.lg,
    flexGrow: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  loadingText: {
    color: COLORS.ui.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    backgroundColor: COLORS.ui.surface,
    borderTopWidth: 2,
    borderTopColor: COLORS.accent.gold,
    gap: SPACING.md,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.ui.surfaceLight,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    color: COLORS.ui.text,
    fontSize: FONTS.sizes.md,
    maxHeight: 100,
    borderWidth: 2,
    borderColor: COLORS.ui.border,
  },
  sendButton: {
    width: 52,
    height: 52,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.accent.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.ui.surfaceLight,
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 24,
  },
});
