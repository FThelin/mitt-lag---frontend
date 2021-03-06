import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import Login from "./login/login";
import LoginDetails from "./login/loginDetails";
import HomeScreen from "./HomeScreen";
import Register from "./login/register";
import Homepage from "./homepage/homepage";
import { getTeam } from "../features/team/teamSlice";
import { setLeader } from "../features/auth/authSlice";

const Stack = createStackNavigator();

export default function Landingpage() {
  //Redux
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const setActiveTeam = useSelector((state) => state.team.setActiveTeam);
  const activeTeam = useSelector((state) => state.team.activeTeam);

  // Get active team data if user has one
  useEffect(() => {
    if (loggedInUser.hasOwnProperty("activeTeam")) {
      if (setActiveTeam) {
        dispatch(getTeam(loggedInUser.activeTeam));
      }
    }
  }, [loggedInUser, setActiveTeam]);

  // Check if user is leader for active team
  useEffect(() => {
    if (activeTeam) {
      for (const leader of activeTeam.leaders) {
        if (leader._id === loggedInUser.id) {
          dispatch(setLeader(true));
          return;
        }
        dispatch(setLeader(false));
      }
    }
  }, [activeTeam]);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none">
        {isLoggedIn ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="HomePage" component={Homepage} />
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
