import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterTeam from "./registerTeam";
import ManageTeam from "./ManageTeam";
import SearchTeam from "./searchTeam";
import ManageTeamNoTeam from "./manageTeamNoTeam";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function ManageTeamNavigation() {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  return (
    <Stack.Navigator headerMode="none">
      {loggedInUser.team && loggedInUser.team.length > 0 ? (
        <>
          <Stack.Screen name="ManageTeam" component={ManageTeam} />
        </>
      ) : (
        <>
          <Stack.Screen name="ManageTeamNoTeam" component={ManageTeamNoTeam} />
          <Stack.Screen name="RegisterTeam" component={RegisterTeam} />
          <Stack.Screen name="FindTeam" component={SearchTeam} />
        </>
      )}
    </Stack.Navigator>
  );
}