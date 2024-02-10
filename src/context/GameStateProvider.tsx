import React, {createContext, useContext, useState, ReactNode} from 'react';
import {GameState} from '../models/GameState';

interface GameStateContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const initialState: GameStateContextType = {
  gameState: new GameState(),
  setGameState: () => {}, // Dummy function for initial value
};

const GameStateContext = createContext<GameStateContextType>(initialState);

// Use ReactNode for typing children prop, which can accept any valid React child (e.g., JSX, null, etc.)
interface GameStateProviderProps {
  children: ReactNode;
}

export const GameStateProvider: React.FC<GameStateProviderProps> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>(new GameState());

  return (
    <GameStateContext.Provider value={{gameState, setGameState}}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
