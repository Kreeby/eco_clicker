// src/screens/HomeScreen.tsx
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initialItems, initialAchievements } from '../config/itemsConfig';
import { GameState } from '../models/GameState';
import { GameStateContext } from '../context/GameStateProvider';


const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
  
    // Consume the GameStateContext
    const gameStateContext = useContext(GameStateContext);

    if (!gameStateContext || !gameStateContext.gameState) {
        // Handle the case when the context is null or gameState is null,
        // such as showing a loading indicator or returning an empty component
        return;
    }

    const { gameState, setGameState } = gameStateContext;
  
    const [achievements, setAchievements] = useState(initialAchievements);
  

    // Handle item clicks to earn points
    const handleItemClick = () => {
        const clickBenefit = gameState.calculateClickBenefit();
        const newGameState = new GameState([...gameState.ownedItems], gameState.points + clickBenefit, gameState.passiveIncomeRate);
        setGameState(newGameState);
    };
    
      
  
    // Handle purchasing items
    const handlePurchase = (itemId: string) => {
      const itemToPurchase = initialItems.find(item => item.id === itemId);
      if (itemToPurchase && gameState.points >= itemToPurchase.cost) {
        gameState.purchaseItem(itemToPurchase);
        setGameState(new GameState([...gameState.ownedItems], gameState.points));
      } else {
        Alert.alert('Not enough points to purchase this item.');
      }
    };
  
    // Handle upgrading items
    const handleUpgrade = (itemId: string) => {
      const itemIndex = gameState.ownedItems.findIndex(item => item.id === itemId);
      if (itemIndex !== -1 && gameState.points >= gameState.ownedItems[itemIndex].cost) {
        gameState.upgradeItem(itemIndex);
        setGameState(new GameState([...gameState.ownedItems], gameState.points));
      } else {
        Alert.alert('Not enough points to upgrade or item not found.');
      }
    };
  
    // Passive income generation
    useEffect(() => {
        const interval = setInterval(() => {
            const updatedState = gameState;
            const passiveIncome = gameState.calculatePassiveIncome();
            updatedState.addPoints(passiveIncome);
            setGameState(updatedState);
        }, 1000); // Adjust the interval as needed for your game's design
    
        return () => clearInterval(interval);
    }, []);
        

    
  
    return (
      <View style={styles.container}>
          <Text style={styles.pointsDisplay}>Points: {gameState.points.toFixed(2)}</Text>
          <TouchableOpacity style={styles.clickableArea} onPress={handleItemClick}>
            <Text>Click Me!</Text>
          </TouchableOpacity>
  
          <View style={styles.shopContainer}>
            <Text style={styles.shopTitle}>Shop</Text>
            {initialItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemButton} onPress={() => handlePurchase(item.id)}>
                <Text style={styles.itemText}>{item.name} - Cost: {item.cost} Points</Text>
              </TouchableOpacity>
            ))}
          </View>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Inventory')}>
          <Text>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Achievements')}>
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