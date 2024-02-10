import React from 'react';
import { GameState } from '../models/GameState';

const initialState = new GameState(); // Initialize your initial game state here

export const GameStateContext = React.createContext<GameState>(initialState);
