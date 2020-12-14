import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FilledButton(props) {
  return (
    <LinearGradient colors={["#EE8674", "#B35C79"]} style={styles.container}>
      <Button compact={true} color="#DEDEDE" style={styles.button}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Kodchasan_700Bold",
          }}
        >
          {props.buttonText}
        </Text>
      </Button>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 20,
  },
});
