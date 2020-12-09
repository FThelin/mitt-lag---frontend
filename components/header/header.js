import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import OutlinedButton from "../buttons/outlinedButton";

export default function Header() {
  return (
    <View style={styles.header}>
      <Button compact={true}>
        <Icon name="bars" size={25} color="#CECECE" />
      </Button>
      <OutlinedButton buttonText="Logga ut" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#252037",
    flex: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "60px",
    padding: "0.5rem",
  },
});
