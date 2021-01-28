import React from "react";
import { StyleSheet, Image, Text, SafeAreaView, View } from "react-native";

export default function DarkContainer(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={props.bigLogo ? styles.bigLogo : styles.tinyLogo}
          source={require("../assets/logo.png")}
        />
        <Text style={styles.text}>{props.text}</Text>
        {props.children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1D182E",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
