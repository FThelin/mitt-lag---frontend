import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { getTeam, changeTeamRole } from "../../features/team/teamSlice";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import BackButton from "../buttons/backButton";

export default function ChangeActiveTeam({ navigation }) {
  const [teamArr, setTeamArr] = useState([]);

  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const activeTeam = useSelector((state) => state.team.activeTeam);

  const dispatch = useDispatch();

  useEffect(() => {
    const test = async () => {
      for (const teamId of loggedInUser.team) {
        const res = await dispatch(getTeam(teamId));
        const team = await res.payload;
        setTeamArr((teamArr) => [...teamArr, team]);
      }
    };
    test();
  }, []);

  return (
    <>
      <DarkContainer>
        <Text
          style={{
            fontSize: 14,
            color: "#CECECE",
            fontFamily: "Kodchasan_500Medium",
          }}
        >
          Välj lag
        </Text>
      </DarkContainer>
      <LightContainer>
        {teamArr.map((team) => (
          <View key={team._id} style={styles.map}>
            <View style={styles.textView}>
              <Text style={styles.text}>{team.name}</Text>
              <Text style={styles.secondText}>{team.sport}</Text>
              <Button
                onPress={() =>
                  dispatch(changeTeamRole(team._id, loggedInUser.id))
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
