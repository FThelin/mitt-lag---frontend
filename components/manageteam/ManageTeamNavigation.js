import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterTeam from "./registerTeam";
import ManageTeam from "./ManageTeam";
import SearchTeam from "./searchTeam";
import ManageTeamNoTeam from "./manageTeamNoTeam";
import HandleRequests from "./handleRequests";
import ChangeActiveTeam from "./changeActiveTeam";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function ManageTeamNavigation() {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none" independent={true}>
        {loggedInUser.team && loggedInUser.team.length > 0 ? (
          <>
            <Stack.Screen name="ManageTeam" component={ManageTeam} />
            <Stack.Screen name="HandleRequests" component={HandleRequests} />
            <Stack.Screen
              name="ChangeActiveTeam"
              component={ChangeActiveTeam}
            />
            <Stack.Screen name="FindTeam" component={SearchTeam} />
            <Stack.Screen name="RegisterTeam" component={RegisterTeam} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="ManageTeamNoTeam"
              component={ManageTeamNoTeam}
            />
            <Stack.Screen name="RegisterTeam" component={RegisterTeam} />
            <Stack.Screen name="FindTeam" component={SearchTeam} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
