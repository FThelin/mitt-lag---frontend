import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveTeam, getUserTeams } from "../../features/team/teamSlice";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import BackButton from "../buttons/backButton";
import LinkButton from "../buttons/linkButton";
import { updateLoggedInUserActiveTeam } from "../../features/auth/authSlice";

export default function ChangeActiveTeam({ navigation }) {
  const [teamArr, setTeamArr] = useState([]);

  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const activeTeam = useSelector((state) => state.team.activeTeam);

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
              </View>
              {activeTeam._id != team._id && (
                <View>
                  <LinkButton
                    text="BYT"
                    click={() =>
                      changeTeam({ teamId: team._id, userId: loggedInUser.id })
                    }
                  ></LinkButton>
                </View>
              )}
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
    color: "#DEDEDE",
    fontFamily: "Kodchasan_700Bold",
  },
  secondText: {
    color: "#DEDEDE",
    fontFamily: "Kodchasan_400Regular",
  },
  map: {
    flexDirection: "row",
    fontFamily: "Kodchasan_700Bold",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },
  textView: {
    flexDirection: "column",
  },
});
