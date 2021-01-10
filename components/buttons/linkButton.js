import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function LinkButton(props) {
  return (
    <View style={{ width: "100%", alignItems: "center", paddingTop: 8 }}>
      <Button icon={props.icon} color="#F18873" onPress={props.click}>
        <Text
          style={{
            fontFamily: "Kodchasan_300Light",
          }}
        >
          {props.text}
        </Text>
      </Button>
    </View>
  );
}
