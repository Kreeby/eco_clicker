import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Item } from '../../models/Item';

interface Props {
  items: Item[];
  onPurchase: (item: Item) => void;
}

const ShopComponent: React.FC<Props> = ({ items, onPurchase }) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity key={item.id} style={styles.item} onPress={() => onPurchase(item)}>
          <Image source={item.icon} style={styles.icon} />
          <Text>{item.name}</Text>
          <Text>Cost: {item.cost}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  item: {
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ShopComponent;
