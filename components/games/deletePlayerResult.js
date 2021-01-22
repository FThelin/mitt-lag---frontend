import React from "react";
import {
  Portal,
  Dialog,
  Button,
  RadioButton,
  DataTable,
} from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { deletePlayerResult } from "../../features/playerResult/playerResultSlice";

export default function DeletePlayerResult(props) {
  const {
    visible,
    hideDialog,
    setPlayerResultId,
    playerResultId,
    playerResults,
    gameDate,
    opponent,
    gameId,
  } = props;

  const dispatch = useDispatch();

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={styles.dialogTitle}>
          {`Vs. ${opponent}`}
        </Dialog.Title>
        <View style={styles.gameData}>
          <Text style={styles.date}>{gameDate}</Text>
        </View>

        <Dialog.Content>
          <DataTable>
            <RadioButton.Group
              onValueChange={(playerResultId) =>
                setPlayerResultId(playerResultId)
              }
              value={playerResultId}
            >
              {playerResults.map((result) => (
                <DataTable.Row key={result._id}>
                  <DataTable.Cell>
                    <RadioButton.Item value={result._id} />
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.playerHeader}>{result.playerName}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.tableData}>
                    <Text>{result.goals}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.tableData}>
                    <Text>{result.assists}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.tableData}>
                    <Text>{result.penalties}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </RadioButton.Group>
          </DataTable>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() =>
              dispatch(
                deletePlayerResult({
                  playerResultId,
                  gameId,
                })
              )
            }
          >
            <Text
              style={{
                color: "#1D182E",
                fontFamily: "Kodchasan_700Bold",
              }}
            >
              Ta bort resultat
            </Text>
          </Button>
          <Button onPress={() => hideDialog()}>
            <Text
              style={{
                color: "#1D182E",
                fontFamily: "Kodchasan_400Regular",
              }}
            >
              Stäng
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
