// src/screens/HomeScreen.tsx
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {initialItems} from '../config/itemsConfig';
import {useGameState} from '../context/GameStateProvider';
import {GameState} from '../models/GameState.ts';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {gameState, setGameState} = useGameState();

  // Handle item clicks to earn points
  const handleItemClick = () => {
    const clickBenefit = gameState.calculateClickBenefit();
    setGameState(
      gameState =>
        new GameState(
          [...gameState.ownedItems],
          gameState.points + clickBenefit,
          gameState.passiveIncomeRate,
        ),
    );
  };

  // Handle purchasing items
  const handlePurchase = (itemId: string) => {
    const itemToPurchase = initialItems.find(item => item.id === itemId);
    if (itemToPurchase && gameState.points >= itemToPurchase.cost) {
      // Clone the gameState to modify
      const newGameState = new GameState(
        [...gameState.ownedItems],
        gameState.points,
        gameState.passiveIncomeRate,
      );
      newGameState.purchaseItem(itemToPurchase);
      setGameState(newGameState);
    } else {
      Alert.alert('Not enough points to purchase this item.');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prevState => {
        const passiveIncome = prevState.calculatePassiveIncome();
        // Note: Make sure this creates a new GameState correctly as per your class definition
        return new GameState(
          [...prevState.ownedItems],
          prevState.points + passiveIncome,
          prevState.passiveIncomeRate,
        );
      });
    }, 1000); // Adjust the interval as needed for your game's design

    return () => clearInterval(interval);
  }, [setGameState]);

  return (
    <View style={styles.container}>
      <Text style={styles.pointsDisplay}>
        Points: {gameState.points.toFixed(2)}
      </Text>
      <TouchableOpacity style={styles.clickableArea} onPress={handleItemClick}>
        <Text>Click Me!</Text>
      </TouchableOpacity>

      <View style={styles.shopContainer}>
        <Text style={styles.shopTitle}>Shop</Text>
        {initialItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemButton}
            onPress={() => handlePurchase(item.id)}>
            <Text style={styles.itemText}>
              {item.name} - Cost: {item.cost} Points
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Inventory')}>
        <Text>Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Achievements')}>
        <Text>Achievements</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  itemButton: {
    margin: 10,
    padding: 10,
    backgroundColor: '#add8e6',
  },
  pointsDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  clickableArea: {
    padding: 20,
    backgroundColor: '#0f0',
    marginBottom: 20,
  },
  shopContainer: {
    marginTop: 20,
  },
  shopTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
  },
  navButton: {
    marginTop: 10,
    backgroundColor: 'lightgrey',
    padding: 10,
  },
});

export default HomeScreen;
