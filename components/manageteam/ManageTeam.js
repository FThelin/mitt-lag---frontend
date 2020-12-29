import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { useSelector, useDispatch } from "react-redux";
import FilledButton from "../buttons/filledButton";
import Icon from "react-native-vector-icons/AntDesign";
import { deletePlayerFromTeam } from "../../features/team/teamSlice";

export default function ManageTeam({ navigation }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  return (
    <>
      <DarkContainer>
        <Text style={styles.headingText}>{loggedInUser.activeTeam.name}</Text>
        <Text style={{ color: "white" }}>Växla lag</Text>
      </DarkContainer>
      <LightContainer>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.orangeTextLeader}>
              <Icon size={14} name="star" color="#EDE387"></Icon> Lagledare
            </Text>
            {loggedInUser.activeTeam.leaders.map((leader) => (
              <View style={styles.leaderText} key={leader._id}>
                <Text style={styles.dataText}>
                  {`${leader.firstname} ${leader.lastname}`}
                </Text>
                <View style={styles.iconText}>
                  <Icon size={18} name="star" color="#EDE387"></Icon>
                  <Icon size={18} name="delete" color="grey"></Icon>
                </View>
              </View>
            ))}
            <Text style={styles.orangeTextPlayer}>
              <Icon size={14} name="staro" color="#EDE387"></Icon> Spelare
            </Text>
            {loggedInUser.activeTeam.players.map((player) => (
              <View style={styles.playerText} key={player._id}>
                <Text style={styles.dataText}>
                  {`${player.firstname} ${player.lastname} `}
                </Text>
                <View style={styles.iconText}>
                  <Icon
                    size={18}
                    name="staro"
                    color="#EDE387"
                    onPress={() =>
                      dispatch(
                        deletePlayerFromTeam({
                          teamId: loggedInUser.activeTeam._id,
                          userId: player._id,
                        })
                      )
                    }
                  ></Icon>
                  <Icon size={18} name="delete" color="grey"></Icon>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <FilledButton buttonText="Förfrågningar" />
            <Surface style={styles.surface}>
              <Text style={styles.surfaceText}>
                {loggedInUser.activeTeam.requests.length}
              </Text>
            </Surface>
          </View>
        </View>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  headingText: {
    color: "#DEDEDE",
    fontFamily: "Kodchasan_700Bold",
  },
  orangeTextLeader: {
    color: "#F18873",
    fontFamily: "Kodchasan_700Bold",
    marginBottom: 4,
  },
  orangeTextPlayer: {
    color: "#F18873",
    fontFamily: "Kodchasan_700Bold",
    marginTop: 24,
    marginBottom: 4,
  },
  dataText: {
    color: "#DEDEDE",
    fontFamily: "Kodchasan_400Regular",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surface: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#DEDEDE",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -4,
    top: -6,
  },
  surfaceText: {
    color: "#F18873",
    fontFamily: "Kodchasan_700Bold",
  },
  buttonContainer: {
    position: "relative",
  },
  textContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
  leaderText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
    marginTop: 3,
  },
  playerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
    marginTop: 3,
  },
  iconText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "14%",
  },
});
