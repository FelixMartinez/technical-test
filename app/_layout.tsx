import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { Stack, usePathname } from 'expo-router';
import useStore from './store/zustand';
import HeaderLogoutButton from './components/Header';

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      console.error('Error al obtener item en SecureStore: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('Error al guardar el token: ', err);
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

if (!publishableKey) {
  throw new Error(
    'Falta la clave pública de Clerk. Por favor, configura EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY en tu archivo .env.',
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <RootLayoutNav />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const pathname = usePathname(); // Obtiene la ruta actual
  const addToNavigationHistory = useStore((state) => state.addToNavigationHistory);
  const { isSignedIn } = useAuth(); // Determina si el usuario está autenticado

  useEffect(() => {
    // Agregar la ruta al historial de navegación
    addToNavigationHistory(pathname);
  }, [pathname]);

  return (
    <Stack
      screenOptions={{
        // Muestra el header solo si el usuario está autenticado
        headerShown: isSignedIn,
        headerBackVisible: false,
        headerRight: isSignedIn ? () => <HeaderLogoutButton /> : null, // Botón de cerrar sesión si está autenticado
        title: '',
      }}
    />
  );
}
