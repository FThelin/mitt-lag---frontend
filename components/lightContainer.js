import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function LightContainer(props) {
  return (
    <View style={[styles.container, { justifyContent: "center", flex: 1 }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[{ alignItems: "center" }, props.extraStyle]}
      >
        {props.children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#252037",
  },
  scroll: {
    width: "100%",
  },
});
