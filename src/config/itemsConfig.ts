// src/config/itemsConfig.ts
import { Item } from '../models/Item';
import { Achievement } from '../models/Achievement';

// Dummy image imports - replace these with actual image imports
import treeImage from '../assets/images/christmas-tree.png';
import pondImage from '../assets/images/pond.png';
import bushImage from '../assets/images/bush.png';

// Define the initial set of items
export const initialItems: Item[] = [
  new Item('tree', 'Tree', 10, 1, treeImage, 'click'),
  new Item('pond', 'Pond', 50, 2, pondImage, 'passive'),
  new Item('bush', 'Bush', 20, 0.5, bushImage, 'click'),
  // Add more items as needed
];

// Define the initial set of achievements
export const initialAchievements: Achievement[] = [
  // Example achievement: Have 10 trees
  new Achievement('tree-hugger', 'Own 10 trees', (gameState) => {
    const treeItem = gameState.ownedItems.find(item => item.id === 'tree');
    return treeItem ? treeItem.level >= 10 : false;
  }),
  // More achievements can be added here
];
