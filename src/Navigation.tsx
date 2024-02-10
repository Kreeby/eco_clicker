// src/Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import AchievementsScreen from './screens/AchievementScreen';
import { GameState } from './models/GameState';

type RootStackParamList = {
  Home: undefined;
  Inventory: undefined;
  Achievements: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {

 const gameState = new GameState();

  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Game Home' }} />
        <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
        <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ title: 'Achievements' }} />
      </Stack.Navigator>
  );
};

export default AppNavigation;
