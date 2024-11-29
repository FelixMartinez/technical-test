import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const ListItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text>{item.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default ListItem;
