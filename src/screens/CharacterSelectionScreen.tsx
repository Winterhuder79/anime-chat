import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CharacterCard } from '../components/CharacterCard';
import { ALL_CHARACTERS, DEMONS, HEROES } from '../constants/characters';
import { Character } from '../types/Character';

type RootStackParamList = {
  CharacterSelection: undefined;
  Story: { character: Character };
};

type CharacterSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CharacterSelection'
>;

interface Props {
  navigation: CharacterSelectionScreenNavigationProp;
}

export const CharacterSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const handleCharacterSelect = (character: Character) => {
    navigation.navigate('Story', { character });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>🗾 Demon Slayer</Text>
      <Text style={styles.subtitle}>Wähle deinen Charakter</Text>
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          ⚔️ {HEROES.length} Helden • 👹 {DEMONS.length} Dämonen
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: Character }) => (
    <CharacterCard character={item} onSelect={handleCharacterSelect} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <FlatList
        data={ALL_CHARACTERS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(100, 181, 246, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#b0bec5',
    marginBottom: 16,
  },
  stats: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  statsText: {
    fontSize: 14,
    color: '#9e9e9e',
  },
});
