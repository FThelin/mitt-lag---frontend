import * as React from "react";
import { Text, StyleSheet } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { FAB } from "react-native-paper";

export default function Games() {
  return (
    <>
      <DarkContainer text="Matcher"></DarkContainer>
      <LightContainer>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => console.log("Pressed")}
        />
        );
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
