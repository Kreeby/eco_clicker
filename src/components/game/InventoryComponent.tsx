import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Item } from '../../models/Item';

interface InventoryProps {
  ownedItems: Item[];
  onUpgrade: (itemId: string) => void;
}

const InventoryComponent: React.FC<InventoryProps> = ({ ownedItems, onUpgrade }) => {
  return (
    <View style={styles.container}>
      {ownedItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.text}>{item.name} (Level: {item.level})</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onUpgrade(item.id)}
          >
            <Text style={styles.buttonText}>Upgrade (Cost: {item.cost})</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default InventoryComponent;
