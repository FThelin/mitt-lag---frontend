import React from "react";
import { Text, View, Button } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";

export default function ManageTeam({ navigation }) {
  return (
    <>
      <DarkContainer>
        <Text style={{ color: "white" }}>
          Manage team screen when you are in a team
        </Text>
      </DarkContainer>
      <LightContainer></LightContainer>
    </>
  );
}
