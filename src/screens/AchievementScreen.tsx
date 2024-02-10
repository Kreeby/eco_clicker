// src/screens/AchievementsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { initialItems, initialAchievements } from '../config/itemsConfig';
import { GameState } from '../models/GameState';

const AchievementsScreen: React.FC = () => {
  // Placeholder for your achievements - replace with your actual logic
  const [achievements, setAchievements] = useState(initialAchievements);
  const [gameState, setGameState] = useState(new GameState(initialItems));

  useEffect(() => {
    achievements.forEach(achievement => {
      if (!achievement.isCompleted && achievement.checkCompletion(gameState)) {
        achievement.isCompleted = true;
        Alert.alert('Achievement unlocked!', achievement.description);
      }
    });
    setAchievements([...achievements]);
  }, [gameState]);

  return (
    <View style={styles.achievementsContainer}>
        <Text style={styles.achievementsTitle}>Achievements</Text>
        {achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementItem}>
            <Text style={achievement.isCompleted ? styles.achievementTextCompleted : styles.achievementText}>
            {achievement.description} - {achievement.isCompleted ? 'Completed' : 'Incomplete'}
            </Text>
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
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  achievementsContainer: {
    marginTop: 20,
  },
  achievementsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  achievementItem: {
    padding: 10,
  },
  achievementText: {
    fontSize: 16,
  },
  achievementTextCompleted: {
    fontSize: 16,
    color: 'green',
  }
  // Add styles for your achievements display
});

export default AchievementsScreen;
