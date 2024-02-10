import { GameState } from "./GameState";

// src/models/Achievement.ts
export class Achievement {
    id: string;
    description: string;
    isCompleted: boolean;
    checkCompletion: (gameState: GameState) => boolean;
  
    constructor(id: string, description: string, checkCompletion: (gameState: GameState) => boolean) {
      this.id = id;
      this.description = description;
      this.isCompleted = false;
      this.checkCompletion = checkCompletion;
    }
  
    evaluate(gameState: GameState) {
      if (!this.isCompleted && this.checkCompletion(gameState)) {
        this.isCompleted = true;
        // Optionally, reward the player
      }
    }
  }
  