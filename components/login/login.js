import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useSelector, useDispatch} from "react-redux"
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import {loginUser} from "../../features/auth/authSlice"

export default function Login() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const isLoading = useSelector((state) => state.auth.isLoading)

  return ( 
      <View style={styles.container}>
        <Text>Logga in vettja...</Text>
        <Button onPress={() => dispatch(loginUser({email: "fredrikthelin82@gmail.com", password: "123456"}))} title={isLoggedIn ? "LOGGA UT" : "LOGGA IN"}/>
        {isLoading && (
            <ActivityIndicator size="small" color="#0000ff" />
        )}
        <Button onPress={() => console.log(isLoggedIn)} title="Test"/>
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
