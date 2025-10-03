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
import { useChat } from '../hooks/useChat';
import { Character } from '../types/Character';
import { ChatMessage } from '../types/Story';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const savedKey = await AsyncStorage.getItem(API_KEY_STORAGE);
      if (savedKey) {
        setApiKey(savedKey);
      } else {
        promptForApiKey();
      }
    } catch (err) {
      Alert.alert('Fehler', 'API-Key konnte nicht geladen werden');
    }
  };

  const promptForApiKey = () => {
    Alert.prompt(
      'OpenAI API-Key',
      'Bitte gib deinen OpenAI API-Key ein:',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Speichern',
          onPress: async key => {
            if (key) {
              await AsyncStorage.setItem(API_KEY_STORAGE, key);
              setApiKey(key);
            }
          },
        },
      ],
      'secure-text',
    );
  };

  const handleSend = async () => {
    if (inputText.trim() && !isLoading) {
      const message = inputText.trim();
      setInputText('');
      await sendMessage(message);
    }
  };

  const handleReset = () => {
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
          <ActivityIndicator size="small" color="#64b5f6" />
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
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Was tut ${character.name}?`}
            placeholderTextColor="#666"
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={isLoading || !inputText.trim()}
          >
            <Text style={styles.sendButtonText}>{isLoading ? '⏳' : '📤'}</Text>
          </TouchableOpacity>
        </View>

        {/* Ability Panel */}
        <AbilityPanel
          character={character}
          isVisible={showAbilities}
          onClose={() => setShowAbilities(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  keyboardView: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  characterTitle: {
    fontSize: 12,
    color: '#9e9e9e',
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  errorContainer: {
    backgroundColor: '#c62828',
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  messagesContainer: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  loadingText: {
    color: '#9e9e9e',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#424242',
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 24,
  },
});
