import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo';
import { Redirect, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Page() {
  const { user } = useUser(); // Información del usuario autenticado
  const { signOut } = useAuth(); // Método para cerrar sesión
  const router = useRouter(); // Navegación entre páginas

  const handleSignOut = async () => {
    try {
      await signOut();
      alert('Has cerrado sesión con éxito.');
    } catch (err: any) {
      console.error('Error al cerrar sesión:', err);
      alert('Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Contenido para usuarios autenticados */}
      <SignedIn>
        {/* <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.text}>{user?.emailAddresses[0].emailAddress}</Text>
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Cerrar Sesión</Text>
        </Pressable> */}
        <Redirect href="/list" />
      </SignedIn>

      {/* Contenido para usuarios no autenticados */}
      <SignedOut>
        <Text style={styles.title}>Bienvenido a la App</Text>
        <Pressable style={styles.button} onPress={() => router.push('/auth/signIn')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondaryButton]} onPress={() => router.push('/auth/signUp')}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Registrarse</Text>
        </Pressable>
      </SignedOut>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
  secondaryButtonText: {
    color: '#1e90ff',
  },
  signOutButton: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
