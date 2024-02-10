import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useGameState} from '../context/GameStateProvider';
import {GameState} from '../models/GameState.ts';

const InventoryScreen = () => {
  const {gameState, setGameState} = useGameState(); // Using the hook for cleaner access

  const handleUpgrade = (itemId: string) => {
    const itemIndex = gameState.ownedItems.findIndex(
      item => item.id === itemId,
    );
    if (
      itemIndex !== -1 &&
      gameState.points >= gameState.ownedItems[itemIndex].cost
    ) {
      gameState.upgradeItem(itemIndex);
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
          <Text
            style={
              styles.itemText
            }>{`${item.name} (Level ${item.level}) - Benefit: ${item.benefit}`}</Text>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => handleUpgrade(item.id)}>
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
