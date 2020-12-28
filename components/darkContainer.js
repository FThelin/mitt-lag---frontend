import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function DarkContainer(props) {
  return (
    <View style={styles.container}>
      <Image
        style={props.bigLogo ? styles.bigLogo : styles.tinyLogo}
        source={require("../assets/logo.png")}
      />
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#1D182E",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    height: 80,
    width: 80,
  },
  bigLogo: {
    height: 210,
    width: 210,
  },
});
