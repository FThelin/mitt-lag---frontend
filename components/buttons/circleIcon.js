import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CircleIcon(props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#EE8674", "#B35C79"]}
        style={styles.linearGradient}
      >
        <Button color="#DEDEDE" style={styles.button}>
          <Icon name={props.icon} size={58} color="#EDEDED" />
        </Button>
      </LinearGradient>
      <Text
        style={{
          marginTop: 5,
          fontSize: "14px",
          fontFamily: "Kodchasan_600SemiBold",
          color: "#EDEDED",
        }}
      >
        {props.buttonText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    height: 100,
    width: 100,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  button: {
    height: 90,
    width: 90,
    backgroundColor: "#252037",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
