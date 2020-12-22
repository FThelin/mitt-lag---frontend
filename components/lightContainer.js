import React from "react";
import { View, StyleSheet } from "react-native";

export default function LightContainer(props) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#252037",
    alignItems: "center",
    // justifyContent: "center",
  },
});
