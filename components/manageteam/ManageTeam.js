import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Surface, Button } from "react-native-paper";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { useSelector, useDispatch } from "react-redux";
import FilledButton from "../buttons/filledButton";
import Icon from "react-native-vector-icons/AntDesign";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import {
  deletePlayerFromTeam,
  deleteLeaderFromTeam,
  changeTeamRole,
} from "../../features/team/teamSlice";
import LinkButton from "../buttons/linkButton";

export default function ManageTeam({ navigation }) {
  const dispatch = useDispatch();
  const activeTeam = useSelector((state) => state.team.activeTeam);
  const isLeader = useSelector((state) => state.auth.isLeader);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  return (
    activeTeam && (
      <>
        <DarkContainer text={activeTeam.name}>
          <LinkButton
            text="VÄXLA LAG"
            click={() => navigation.navigate("ChangeActiveTeam")}
            icon="swap-horizontal"
          />
        </DarkContainer>
        <LightContainer>
          <View style={styles.topMainContainer}>
            <View>
              <Button onPress={() => navigation.navigate("RegisterTeam")}>
                <IconMC
                  name="account-multiple-plus-outline"
                  size={28}
                  color="#F18873"
                />
              </Button>
              <Text style={styles.topText}>NYTT LAG</Text>
            </View>
            <View>
              <Button onPress={() => navigation.navigate("FindTeam")}>
                <IconMC name="arrow-decision" size={28} color="#F18873" />
              </Button>
              <Text style={styles.topText}>GÅ MED</Text>
            </View>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.orangeTextLeader}>
                <Icon size={14} name="star" color="#EDE387"></Icon> Lagledare
              </Text>
              {activeTeam.leaders.map((leader) => (
                <View style={styles.leaderText} key={leader._id}>
                  <Text style={styles.dataText}>
                    {`${leader.firstname} ${leader.lastname}`}
                  </Text>
                  {isLeader && (
                    <View style={styles.iconText}>
                      {leader._id == loggedInUser.id ? null : (
                        <Icon
                          size={18}
                          name="star"
                          color="#EDE387"
                          onPress={() =>
                            dispatch(
                              changeTeamRole({
                                teamId: activeTeam._id,
                                userId: leader._id,
                              })
                            )
                          }
                        ></Icon>
                      )}
                      {leader._id == loggedInUser.id ? null : (
                        <Icon
                          size={18}
                          name="delete"
                          color="grey"
                          onPress={() =>
                            dispatch(
                              deleteLeaderFromTeam({
                                teamId: activeTeam._id,
                                userId: leader._id,
                              })
                            )
                          }
                        ></Icon>
                      )}
                    </View>
                  )}
                </View>
              ))}
              <Text style={styles.orangeTextPlayer}>
                <Icon size={14} name="staro" color="#EDE387"></Icon> Spelare
              </Text>
              {activeTeam.players.map((player) => (
                <View style={styles.playerText} key={player._id}>
                  <Text style={styles.dataText}>
                    {`${player.firstname} ${player.lastname} `}
                  </Text>
                  {isLeader && (
                    <View style={styles.iconText}>
                      <Icon
                        size={18}
                        name="staro"
                        color="#EDE387"
                        onPress={() =>
                          dispatch(
                            changeTeamRole({
                              teamId: activeTeam._id,
                              userId: player._id,
                            })
                          )
                        }
                      ></Icon>
                      <Icon
                        size={18}
                        name="delete"
                        color="grey"
                        onPress={() =>
                          dispatch(
                            deletePlayerFromTeam({
                              teamId: activeTeam._id,
                              userId: player._id,
                            })
                          )
                        }
                      ></Icon>
                    </View>
                  )}
                </View>
              ))}
            </View>
            {isLeader && (
              <View style={styles.buttonContainer}>
                <FilledButton
                  buttonText="Förfrågningar"
                  click={() => navigation.navigate("HandleRequests")}
                />
                <Surface style={styles.surface}>
                  <Text style={styles.surfaceText}>
                    {activeTeam.requests.length}
                  </Text>
                </Surface>
              </View>
            )}
          </View>
        </LightContainer>
      </>
    )
  );
}

const styles = StyleSheet.create({
  topText: {
    fontFamily: "Kodchasan_700Bold",
    color: "#CFCFCF",
    fontSize: 12,
  },
  topMainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 12,
  },
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
