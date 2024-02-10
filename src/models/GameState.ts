// src/models/GameState.ts
import {Item} from './Item';

export class GameState {
  points: number;
  ownedItems: Item[];
  passiveIncomeRate: number;

  constructor(ownedItems: Item[] = [], points = 0, passiveIncomeRate = 0) {
    this.ownedItems = ownedItems;
    this.points = points;
    this.passiveIncomeRate = passiveIncomeRate;
  }

  addPoints(amount: number) {
    this.points += amount;
  }

  calculatePassiveIncome(): number {
    return this.ownedItems
      .filter(item => item.type === 'passive')
      .reduce((sum, item) => sum + item.benefit, 0);
  }

  purchaseItem(item: Item) {
    console.log(this.points);
    if (this.points >= item.cost) {
      this.points -= item.cost;
      this.ownedItems.push(item);
      // Assuming `updatePassiveIncomeRate` recalculates `passiveIncomeRate` based on ownedItems
      this.updatePassiveIncomeRate();
    } else {
      console.log('Not enough points');
    }
  }

  calculateClickBenefit(): number {
    // Ensure this method returns a positive value or zero, never negative.
    return this.ownedItems
      .filter(item => item.type === 'click')
      .reduce((sum, item) => sum + item.benefit, 1); // Example: Starts with 1 to ensure a minimum benefit.
  }

  upgradeItem(itemIndex: number) {
    // Assuming the item can be upgraded and you have enough points
    const item = this.ownedItems[itemIndex];
    if (item && this.points >= item.upgradeCost()) {
      this.points -= item.upgradeCost(); // Deduct the upgrade cost
      item.upgrade(); // Upgrade the item
    }
  }

  updatePassiveIncomeRate() {
    this.passiveIncomeRate = this.ownedItems
      .filter(item => item.type === 'passive')
      .reduce((sum, item) => sum + item.benefit, 0);
  }

  static initialStateFromConfig(): GameState {
    const initialItems = require('../config/itemsConfig').initialItems;
    return new GameState(initialItems);
  }

  // New method to clone the current state and update points
  static fromStateWithAddedPoints(
    currentState: GameState,
    pointsToAdd: number,
  ): GameState {
    // Correcting the order of arguments to match the constructor
    let newState = new GameState(
      currentState.ownedItems.slice(), // Correct order: first argument is an array of Item
      currentState.points + pointsToAdd, // Second argument is points
      currentState.passiveIncomeRate, // Assuming the third argument is passiveIncomeRate
    );
    // Additional logic as necessary
    return newState;
  }
}
