// src/App.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { GameState } from './models/GameState';
import { Item } from './models/Item';
import { Achievement } from './models/Achievement';
import { initialItems, initialAchievements } from './config/itemsConfig';
import AppNavigation from './Navigation';
import GameStateProvider  from './context/GameStateProvider';
import { NavigationContainer } from '@react-navigation/native';


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <GameStateProvider> {/* Wrap the entire app with the context provider */}
        <AppNavigation /> {/* Your main navigation component */}
      </GameStateProvider>
    </NavigationContainer>
  );
};

// const App: React.FC = () => {
//   const [gameState, setGameState] = useState(new GameState(initialItems));
//   const [achievements, setAchievements] = useState(initialAchievements);

//   // Handle item clicks to earn points
//   const handleItemClick = () => {
//     const clickBenefit = gameState.calculateClickBenefit();
//     setGameState(prevState => {
//         // Note: Make sure this creates a new GameState correctly as per your class definition
//         return new GameState([...prevState.ownedItems], prevState.points + clickBenefit, prevState.passiveIncomeRate);
//     });
//   };


//   // Handle purchasing items
//   const handlePurchase = (itemId: string) => {
//     const itemToPurchase = initialItems.find(item => item.id === itemId);
//     if (itemToPurchase && gameState.points >= itemToPurchase.cost) {
//       gameState.purchaseItem(itemToPurchase);
//       setGameState(new GameState([...gameState.ownedItems], gameState.points));
//     } else {
//       Alert.alert('Not enough points to purchase this item.');
//     }
//   };

//   // Handle upgrading items
//   const handleUpgrade = (itemId: string) => {
//     const itemIndex = gameState.ownedItems.findIndex(item => item.id === itemId);
//     if (itemIndex !== -1 && gameState.points >= gameState.ownedItems[itemIndex].cost) {
//       gameState.upgradeItem(itemIndex);
//       setGameState(new GameState([...gameState.ownedItems], gameState.points));
//     } else {
//       Alert.alert('Not enough points to upgrade or item not found.');
//     }
//   };

//   // Passive income generation
//   useEffect(() => {
//     const interval = setInterval(() => {
//         setGameState(prevState => {
//             const passiveIncome = prevState.calculatePassiveIncome();
//             // Note: Make sure this creates a new GameState correctly as per your class definition
//             return new GameState([...prevState.ownedItems], prevState.points + passiveIncome, prevState.passiveIncomeRate);
//         });
//     }, 1000); // Adjust the interval as needed for your game's design

//     return () => clearInterval(interval);
// }, []);

//   // Achievement checks
//   useEffect(() => {
//     achievements.forEach(achievement => {
//       if (!achievement.isCompleted && achievement.checkCompletion(gameState)) {
//         achievement.isCompleted = true;
//         Alert.alert('Achievement unlocked!', achievement.description);
//       }
//     });
//     setAchievements([...achievements]);
//   }, [gameState]);

//   // UI rendering
//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Text style={styles.pointsDisplay}>Points: {gameState.points.toFixed(2)}</Text>
//         <TouchableOpacity style={styles.clickableArea} onPress={handleItemClick}>
//           <Text>Click Me!</Text>
//         </TouchableOpacity>

//         <View style={styles.shopContainer}>
//           <Text style={styles.shopTitle}>Shop</Text>
//           {initialItems.map((item) => (
//             <TouchableOpacity key={item.id} style={styles.itemButton} onPress={() => handlePurchase(item.id)}>
//               <Text style={styles.itemText}>{item.name} - Cost: {item.cost} Points</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

        
//         <View style={styles.inventoryContainer}>
//           <Text style={styles.inventoryTitle}>Inventory</Text>
//           {gameState.ownedItems.map((item, index) => (
//             <View key={index} style={styles.inventoryItem}>
//               <Text style={styles.itemText}>{`${item.name} (Level ${item.level}) - Benefit: ${item.benefit}`}</Text>
//               <TouchableOpacity style={styles.upgradeButton} onPress={() => handleUpgrade(item.id)}>
//                 <Text style={styles.upgradeButtonText}>Upgrade</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>

        
//         <View style={styles.achievementsContainer}>
//           <Text style={styles.achievementsTitle}>Achievements</Text>
//           {achievements.map((achievement, index) => (
//             <View key={index} style={styles.achievementItem}>
//               <Text style={achievement.isCompleted ? styles.achievementTextCompleted : styles.achievementText}>
//                 {achievement.description} - {achievement.isCompleted ? 'Completed' : 'Incomplete'}
//               </Text>
//             </View>
//           ))}
//         </View>

//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   pointsDisplay: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   clickableArea: {
//     padding: 20,
//     backgroundColor: '#0f0',
//     marginBottom: 20,
//   },
//   shopContainer: {
//     marginTop: 20,
//   },
//   shopTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   itemButton: {
//     backgroundColor: '#add8e6',
//     padding: 10,
//     marginVertical: 5,
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   inventoryContainer: {
//     marginTop: 20,
//   },
//   inventoryTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   inventoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#90ee90',
//     padding: 10,
//     marginVertical: 5,
//   },
//   upgradeButton: {
//     backgroundColor: '#f08080',
//     padding: 10,
//   },
//   upgradeButtonText: {
//     color: '#fff',
//   },
//   achievementsContainer: {
//     marginTop: 20,
//   },
//   achievementsTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   achievementItem: {
//     padding: 10,
//   },
//   achievementText: {
//     fontSize: 16,
//   },
//   achievementTextCompleted: {
//     fontSize: 16,
//     color: 'green',
//   }
// });

export default App;
