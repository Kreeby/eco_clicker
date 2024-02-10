import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GameStateContext } from '../context/GameStateProvider';
import { GameState } from '../models/GameState';

const InventoryScreen: React.FC = () => {
  const gameStateContext = useContext(GameStateContext);

  if (!gameStateContext) {
    // Handle the case when the context is null, such as showing a loading indicator or returning an empty component
    return;
  }

  const { gameState, setGameState } = gameStateContext;

  const handleUpgrade = (itemId: string) => {
    const itemIndex = gameState.ownedItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1 && gameState.points >= gameState.ownedItems[itemIndex].cost) {
      gameState.upgradeItem(itemIndex);
      // Update the context with the new game state
      setGameState(new GameState([...gameState.ownedItems], gameState.points));
    } else {
      Alert.alert('Not enough points to upgrade or item not found.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inventoryTitle}>Inventory</Text>
      {gameState.ownedItems.map((item, index) => (
        <View key={index} style={styles.inventoryItem}>
          <Text style={styles.itemText}>{`${item.name} (Level ${item.level}) - Benefit: ${item.benefit}`}</Text>
          <TouchableOpacity style={styles.upgradeButton} onPress={() => handleUpgrade(item.id)}>
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inventoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inventoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#90ee90',
    padding: 10,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
  },
  upgradeButton: {
    backgroundColor: '#f08080',
    padding: 10,
  },
  upgradeButtonText: {
    color: '#fff',
  },
});

export default InventoryScreen;
