import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Platform } from 'react-native';

export default function App() {

  const login = async () => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "fredrikthelin82@gmail.com",
        password: "123456"
      }),
    });

    const token = await response.json()  

    if (Platform.OS === 'web') {
      localStorage.setItem('token', token);
  } else {
      await SecureStore.setItemAsync('jwt', token);
  }
  }

  return (
    <View style={styles.container}>
      <Text>Hej</Text>
      <Button onPress={() => login()}></Button>
      <Button onPress={() => console.log(document.cookie)}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
