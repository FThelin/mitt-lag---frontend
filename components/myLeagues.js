import React from "react";
import { Text } from "react-native";
import LightContainer from "./lightContainer";

export default function MyLeagues() {
  const [visible, setVisible] = React.useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <LightContainer>
      <Text style={{ color: "#ffffff" }}>Kommer snart</Text>
    </LightContainer>
  );
}
