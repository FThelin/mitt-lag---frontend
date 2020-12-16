import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Login from "./login/login";
import LoginDetails from "./login/loginDetails";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

export default function Landingpage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isLoggedIn ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginDetails" component={LoginDetails} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
