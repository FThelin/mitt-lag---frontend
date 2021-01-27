import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Games from "./games";
import CreateGame from "./createGame";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function GamesNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Games" component={Games} />
        <Stack.Screen name="CreateGame" component={CreateGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
