import * as React from "react";
import { Text } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";

export default function Games() {
  return (
    <>
      <DarkContainer>
        <Text
          style={{
            fontSize: 14,
            color: "#CECECE",
            fontFamily: "Kodchasan_500Medium",
          }}
        >
          Matcher
        </Text>
      </DarkContainer>
      <LightContainer></LightContainer>
    </>
  );
}
