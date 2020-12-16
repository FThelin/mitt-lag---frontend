import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Register() {
  //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <View style={styles.container}>
      <Button title="Test">REGISTRERA</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
