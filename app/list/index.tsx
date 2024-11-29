import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import axios from 'axios';
import useStore from '../store/zustand';
import { useAuth } from '@clerk/clerk-expo';

export default function ListScreen() {
  const router = useRouter();
  const { items, setItems, selectItem } = useStore();

  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/auth/signIn" />;
  }

  useEffect(() => {
    const fetchItems = async () => {
      if (items.length === 0) { // Solo obtener datos si items está vacío
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setItems(response.data);
      }
    };
    fetchItems();
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Elementos</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              selectItem(item);
              router.push(`/list/${item.id}`);
            }}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    flexGrow: 1,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
});
