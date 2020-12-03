import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useSelector, useDispatch} from "react-redux"
import { StyleSheet, Text, View, Button } from 'react-native';
import authSlice from "../../features/auth/authSlice"

const { setLoggedIn } = authSlice.actions;

export default function Login() {
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.auth.loggedIn)

  return ( 
      <View style={styles.container}>
      <Text>{loggedIn ? "Inloggad" : "Inte inloggad"}</Text>
      <Button onPress={() => dispatch(setLoggedIn(true))} title="Logga in"/>
      <Button onPress={() => console.log(loggedIn)} title="Test"/>
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
