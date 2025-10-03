import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CharacterSelectionScreen } from './src/screens/CharacterSelectionScreen';
import { StoryScreen } from './src/screens/StoryScreen';
import { Character } from './src/types/Character';

type RootStackParamList = {
  CharacterSelection: undefined;
  Story: { character: Character };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
