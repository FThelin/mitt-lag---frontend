import React from "react";
import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";

export default function DarkContainer(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={props.bigLogo ? styles.bigLogo : styles.tinyLogo}
        source={require("../assets/logo.png")}
      />
      <Text style={styles.text}>{props.text}</Text>
      {props.children}
    </SafeAreaView>
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
  text: {
    color: "#CFCFCF",
    fontSize: 18,
    fontFamily: "Kodchasan_700Bold",
  },
});
