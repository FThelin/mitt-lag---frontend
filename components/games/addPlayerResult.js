import React, { useState } from "react";
import { Portal, Dialog, Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useSelector, useDispatch } from "react-redux";
import { addPlayerResult } from "../../features/playerResult/playerResultSlice";

export default function AddPlayerResult(props) {
  const {
    visible,
    hideDialog,
    setPlayerResults,
    playerResults,
    gameDate,
    opponent,
    gameId,
  } = props;

  const [player, setPlayer] = useState("");

  //Redux
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const isLeader = useSelector((state) => state.auth.isLeader);
  const activeTeam = useSelector((state) => state.team.activeTeam);
  const dispatch = useDispatch();

  const [resultData, setResultData] = useState({
    gameId,
    userId: loggedInUser.id,
    goals: 0,
    assists: 0,
    penalties: 0,
  });

  const itemsList = () => {
    let items = [];

    for (let i = 0; i <= 20; i++) {
      let temp = {
        label: i.toString(),
        value: i,
      };
      items.push(temp);
    }
    return items;
  };

  const playerList = () => {
    let items = [];
    let members = activeTeam.leaders.concat(activeTeam.players);

    for (let i = 0; i < members.length; i++) {
      let temp = {
        label: `${members[i].firstname} ${members[i].lastname}`,
        value: members[i]._id,
      };
      items.push(temp);
    }
    return items;
  };

  //Add player result
  const createPlayerResult = async (data) => {
    const res = await dispatch(addPlayerResult(data));
    if (res) {
      await setPlayerResults([...playerResults, res.payload]);
      hideDialog();
    }
  };

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={styles.dialogTitle}>
          {`Vs. ${opponent}`}
        </Dialog.Title>
        <View style={styles.gameData}>
          <Text style={styles.date}>{gameDate}</Text>

          {isLeader ? (
            <View>
              <Text style={styles.dialogText}>Välj Spelare</Text>
              <View
                style={{
                  height: 35,
                  width: 150,
                  borderColor: "black",
                  borderWidth: 2,
                  alignItems: "flex-start",
                  flexDirection: "row",
                  padding: 2,
                  justifyContent: "space-between",
                  backgroundColor: "#E7E7E7",
                }}
              >
                <Text style={{ marginTop: 7 }}>
                  <RNPickerSelect
                    placeholder={{}}
                    onValueChange={(value) =>
                      setResultData({ ...resultData, userId: value })
                    }
                    items={playerList()}
                  />
                </Text>
              </View>
            </View>
          ) : (
            <Text
              style={styles.name}
            >{`${loggedInUser.firstname} ${loggedInUser.lastname}`}</Text>
          )}
        </View>

        <Dialog.Content>
          <View style={styles.selectContainer}>
            <View>
              <Text style={styles.dialogText}>Mål</Text>
              <RNPickerSelect
                placeholder={{}}
                onValueChange={(value) =>
                  setResultData({ ...resultData, goals: value })
                }
                items={itemsList()}
              />
            </View>
            <View>
              <Text style={styles.dialogText}>Assists</Text>
              <RNPickerSelect
                placeholder={{}}
                onValueChange={(value) =>
                  setResultData({ ...resultData, assists: value })
                }
                items={itemsList()}
              />
            </View>
            <View>
              <Text style={styles.dialogText}>Utv/Min</Text>
              <RNPickerSelect
                placeholder={{}}
                onValueChange={(value) =>
                  setResultData({ ...resultData, penalties: value })
                }
                items={itemsList()}
              />
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => createPlayerResult(resultData)}>
            <Text
              style={{
                color: "#1D182E",
                fontFamily: "Kodchasan_700Bold",
              }}
            >
              spara
            </Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#FBFBFB",
    padding: 20,
  },
  dialogTitle: {
    color: "#F18873",
    fontFamily: "Kodchasan_700Bold",
  },
  dialogText: {
    color: "#1D182E",
    fontFamily: "Kodchasan_700Bold",
    fontSize: 16,
  },
  gameData: {
    marginLeft: 25,
    marginBottom: 25,
  },
  date: {
    fontFamily: "Kodchasan_300Light_Italic",
  },
  name: {
    fontFamily: "Kodchasan_500Medium",
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
