import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState } from '../models/GameState';

export const saveGameState = async (gameState: GameState) => {
  try {
    const jsonValue = JSON.stringify(gameState);
    await AsyncStorage.setItem('@gameState', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const loadGameState = async (): Promise<GameState | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@gameState');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
    return null;
  }
};
