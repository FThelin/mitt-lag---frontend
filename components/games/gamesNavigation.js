import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Games from "./games";
import CreateGame from "./createGame";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function GamesNavigation() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Games" component={Games} />
      <Stack.Screen name="CreateGame" component={CreateGame} />
    </Stack.Navigator>
  );
}
