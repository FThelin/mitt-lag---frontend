import React from "react";
import { List, Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PlayerResult() {
  return (
    <List.Accordion
      style={styles.accordion}
      titleStyle={{ color: "#1D182E", fontFamily: "Kodchasan_700Bold" }}
      title="Spelarresultat"
    >
      {/* <List.Item title="First item" /> */}
      <Button onPress={() => console.log("hej")}>
        <View style={styles.controls}>
          <Icon name="plus-circle-outline" size={20} color="#787878" />
          <Text style={styles.controlText}>Lägg till...</Text>
        </View>
      </Button>
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#CFCFCF",
    textAlign: "center",
    padding: 0,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  controlText: {
    color: "#787878",
    fontSize: 14,
    fontFamily: "Kodchasan_700Bold",
    marginLeft: 5,
  },
});
