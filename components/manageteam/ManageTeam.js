import React from "react";
import { Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import CircleIcon from "../buttons/circleIcon";

export default function ManageTeam() {
  return (
    <>
      <DarkContainer></DarkContainer>
      <LightContainer>
        <View
          style={{
            height: 300,
            width: 300,
            justifyContent: "space-around",
          }}
        ></View>
      </LightContainer>
    </>
  );
}
