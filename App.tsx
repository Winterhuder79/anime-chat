import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CharacterSelectionScreen } from './src/screens/CharacterSelectionScreen';
import { StoryScreen } from './src/screens/StoryScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { SettingsProvider } from './src/context/SettingsContext';
import { Character } from './src/types/Character';

type RootStackParamList = {
  CharacterSelection: undefined;
  Story: { character: Character };
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CharacterSelection"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#0a0a0a' },
          }}
        >
          <Stack.Screen
            name="CharacterSelection"
            component={CharacterSelectionScreen}
          />
          <Stack.Screen name="Story" component={StoryScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
};

export default App;
