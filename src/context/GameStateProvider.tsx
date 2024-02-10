import React, { createContext, useState } from 'react';
import { Text } from 'react-native'; // Import Text component
import { GameState } from '../models/GameState';

interface GameStateProviderProps {
  children: React.ReactNode;
}

interface GameStateContextType {
  gameState: GameState;
  setGameState: (newState: GameState) => void;
}

export const GameStateContext = createContext<GameStateContextType | null>(null);

const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState(new GameState());

  const updateGameState = (newState: GameState) => {
    setGameState(newState);
  };

  return (
    <GameStateContext.Provider value={{ gameState, setGameState: updateGameState }}>
      {/* Wrap children in a Text component */}
      <Text>{children}</Text>
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
