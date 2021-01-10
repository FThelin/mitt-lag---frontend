import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveTeam, getUserTeams } from "../../features/team/teamSlice";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import BackButton from "../buttons/backButton";
import { updateLoggedInUserActiveTeam } from "../../features/auth/authSlice";

export default function ChangeActiveTeam({ navigation }) {
  const [teamArr, setTeamArr] = React.useState([]);

  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const setActiveTeam = useSelector((state) => state.team.setActiveTeam);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserTeamsFunction();
  }, []);

  const getUserTeamsFunction = async () => {
    const res = await dispatch(getUserTeams(loggedInUser.id));
    setTeamArr(res.payload);
  };

  const changeTeam = async (data) => {
    await dispatch(changeActiveTeam(data));
    await dispatch(updateLoggedInUserActiveTeam(data.teamId));
    navigation.goBack();
  };

  return (
    <>
      <DarkContainer text="Välj lag"></DarkContainer>
      <LightContainer>
        {!!teamArr != [] &&
          teamArr.map((team) => (
            <View key={team._id} style={styles.map}>
              <View style={styles.textView}>
                <Text style={styles.text}>{team.name}</Text>
                <Text style={styles.secondText}>{team.sport}</Text>
                <Button
                  onPress={() =>
                    changeTeam({ teamId: team._id, userId: loggedInUser.id })
                  }
                >
                  BYT TILL
                </Button>
              </View>
            </View>
          ))}
        <View>
          <BackButton click={() => navigation.goBack()}></BackButton>
        </View>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "Kodchasan_700Bold",
    marginBottom: 8,
  },
  secondText: {
    color: "white",
    fontFamily: "Kodchasan_400Regular",
    marginBottom: 8,
  },
  map: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#DEDEDE",
    fontFamily: "Kodchasan_700Bold",
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
    marginTop: 3,
  },
});
