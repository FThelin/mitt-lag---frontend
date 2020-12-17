import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function OutlinedButton(props) {
  return (
    <LinearGradient colors={["#EE8674", "#B35C79"]} style={styles.container}>
      <Button
        compact={true}
        color="#DEDEDE"
        style={styles.button}
        onPress={props.click}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Kodchasan_600SemiBold",
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
    backgroundColor: "#252037",
    borderRadius: 20,
  },
});
