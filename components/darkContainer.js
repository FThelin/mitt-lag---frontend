import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function DarkContainer(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={require("../assets/logo.png")} />
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1D182E",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    height: 80,
    width: 80,
  },
});
