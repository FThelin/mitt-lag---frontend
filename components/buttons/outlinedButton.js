import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import gradient from "../../assets/gradient.png";

export default function OutlinedButton(props) {
  return (
    <View style={styles.container}>
      <Button color="#DEDEDE" style={styles.button}>
        <Text style={{ fontSize: "12px", fontFamily: "Kodchasan_600SemiBold" }}>
          {props.buttonText}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: `url(${gradient})`,
    backgroundSize: "contain",
    padding: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "40px",
  },
  button: {
    backgroundColor: "#252037",
    borderRadius: "40px",
  },
});
