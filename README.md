# Proyecto de Autenticación con Clerk y Expo

Esta aplicación es un ejemplo de autenticación utilizando **Clerk** y **Expo**, desarrollado en React Native. Permite a los usuarios registrarse, iniciar sesión, editar datos y cerrar sesión. La aplicación está configurada para almacenar estado global utilizando **Zustand**.

## Características

- Autenticación de usuarios con Clerk.
- Registro, inicio de sesión y cierre de sesión.
- Estado global con Zustand.
- Diseño responsivo y optimizado con Flexbox.

## Requisitos

Asegúrate de tener instalado:

- Node.js (versión recomendada: `16.x` o superior)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio o Xcode si deseas emular en dispositivos físicos.

## Instalación

Sigue estos pasos para descargar y configurar la aplicación:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. Instala las dependencias del proyecto:
   npm install

3. Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clave_publica_de_clerk

## Emulación

1. Inicia el servidor de desarrollo
   npx expo start

2. Escanea el código QR con la aplicación Expo Go (disponible en Android/iOS) o selecciona un simulador en tu computadora:
   Para iOS: Xcode.
   Para Android: Android Studio.

## Registo de usuario

   Los emails debe tener la siguiente estructura: **name+clerk_test@dominio**