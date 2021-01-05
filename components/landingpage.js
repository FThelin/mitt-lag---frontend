import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import Login from "./login/login";
import LoginDetails from "./login/loginDetails";
import HomeScreen from "./HomeScreen";
import Register from "./login/register";
import ManageTeam from "./manageteam/ManageTeam";
import RegisterTeam from "./manageteam/registerTeam";
import Homepage from "./homepage/homepage";
import { getTeam } from "../features/team/teamSlice";
import { setLeader } from "../features/auth/authSlice";

const Stack = createStackNavigator();

export default function Landingpage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const activeTeam = useSelector((state) => state.team.activeTeam);

  useEffect(() => {
    if (loggedInUser.hasOwnProperty("activeTeam")) {
      dispatch(getTeam(loggedInUser.activeTeam));
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (activeTeam) {
      for (const leader of activeTeam.leaders) {
        if (leader._id === loggedInUser.id) {
          dispatch(setLeader(true));
        }
      }
    }
  }, [activeTeam]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isLoggedIn ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="HomePage" component={Homepage} />
            <Stack.Screen name="ManageTeam" component={ManageTeam} />
            <Stack.Screen name="RegisterTeam" component={RegisterTeam} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginDetails" component={LoginDetails} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
