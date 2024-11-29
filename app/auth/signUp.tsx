import * as React from 'react';
import { TextInput, Button, View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter, Link } from 'expo-router';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      setError(null);
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Ocurrió un error inesperado.');
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      setError(null);
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/list');
      } else {
        setError('No se pudo completar el registro. Por favor, inténtalo de nuevo.');
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Ocurrió un error inesperado.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Título de la página */}
        <Text style={styles.title}>Crea una cuenta</Text>

        {!pendingVerification && (
          <>
            {/* Mostrar mensajes de error */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Campos de entrada */}
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Correo Electrónico"
              style={styles.input}
              onChangeText={(email) => setEmailAddress(email)}
              keyboardType="email-address"
            />
            <TextInput
              value={password}
              placeholder="Contraseña"
              secureTextEntry
              style={styles.input}
              onChangeText={(password) => setPassword(password)}
            />
            <Button title="Registrarse" onPress={onSignUpPress} />
          </>
        )}

        {pendingVerification && (
          <>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
              value={code}
              placeholder="Código de Verificación"
              style={styles.input}
              onChangeText={(code) => setCode(code)}
            />
            <Button title="Verificar" onPress={onPressVerify} />
          </>
        )}

        {/* Enlace para iniciar sesión */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
          <Pressable onPress={() => router.replace('/auth/signIn')}>
            <Text style={styles.link}>Inicia sesión</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    maxWidth: 400, // Ancho máximo para dispositivos más grandes
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    marginRight: 5,
  },
  link: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
