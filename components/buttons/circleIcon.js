import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CircleIcon(props) {
  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={props.click}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#EE8674", "#B35C79"]}
          style={styles.linearGradient}
        >
          <View color="#DEDEDE" style={styles.button}>
            <Icon name={props.icon} size={58} color="#EDEDED" />
          </View>
        </LinearGradient>
        <Text
          style={{
            marginTop: 5,
            fontSize: 14,
            fontFamily: "Kodchasan_600SemiBold",
            color: "#EDEDED",
          }}
        >
          {props.buttonText}
        </Text>
      </View>
    </TouchableOpacity>
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
