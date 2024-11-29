import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import useStore from '../store/zustand'; // Acceso al estado global

export default function HeaderLogoutButton() {
  const { signOut } = useAuth(); // Método para cerrar sesión
  const router = useRouter();
  const { clearState } = useStore(); // Método para limpiar el estado global

  const handleSignOut = async () => {
    try {
      await signOut();
      clearState();
      router.replace('/auth/signIn'); // Redirigir al inicio de sesión
    } catch (err: any) {
      console.error('Error al cerrar sesión:', err);
      alert('Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Pressable style={styles.logoutButton} onPress={handleSignOut}>
      <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ff4d4f',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
