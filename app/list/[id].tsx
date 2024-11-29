import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import useStore from '../store/zustand';
import { useAuth } from '@clerk/clerk-expo';

export default function ItemDetailScreen() {
  const router = useRouter();
  const { selectedItem, updateEditableData } = useStore(); // Usa updateEditableData para guardar cambios
  const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre vista y edición
  const [title, setTitle] = useState(selectedItem?.title || '');
  const [body, setBody] = useState(selectedItem?.body || '');

  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/auth/signIn" />;
  }

  if (!selectedItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontró el elemento seleccionado.</Text>
        <Pressable style={styles.backButton} onPress={() => router.replace('/list')}>
          <Text style={styles.backButtonText}>Regresar a la lista</Text>
        </Pressable>
      </View>
    );
  }

  const handleSave = () => {
    updateEditableData('title', title);
    updateEditableData('body', body);
    setIsEditing(false); // Salir del modo de edición
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Elemento</Text>

      {!isEditing ? (
        <>
          <View style={styles.card}>
            <Text style={styles.detailTitle}>{selectedItem.title}</Text>
            <Text style={styles.detailBody}>{selectedItem.body}</Text>
          </View>
          <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </Pressable>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Regresar a la lista</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Título"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              value={body}
              onChangeText={setBody}
              placeholder="Descripción"
              multiline
            />
          </View>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </Pressable>
          <Pressable style={styles.backButton} onPress={() => setIsEditing(false)}>
            <Text style={styles.backButtonText}>Cancelar</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  detailBody: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '100%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  backButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#ffa500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
    marginBottom: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
