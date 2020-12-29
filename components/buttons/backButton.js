import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function BackButton(props) {
  return (
    <View style={{ width: "100%", alignItems: "center", paddingTop: 8 }}>
      <Button icon="keyboard-backspace" color="#F18873" onPress={props.click}>
        <Text style={{ fontFamily: "Kodchasan_300Light" }}>TILLBAKA</Text>
      </Button>
    </View>
  );
}
