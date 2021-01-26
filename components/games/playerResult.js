import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayerResults } from "../../features/playerResult/playerResultSlice";
import { List, Button, ActivityIndicator, DataTable } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddPlayerResult from "./addPlayerResult";
import DeletePlayerResult from "./deletePlayerResult";
import { deletePlayerResult } from "../../features/playerResult/playerResultSlice";

export default function PlayerResult(props) {
  const { gameId, opponent, gameDate } = props;
  const [playerResults, setPlayerResults] = useState([]);
  const [playerResultId, setPlayerResultId] = useState("");
  const [inEditMode, setInEditMode] = useState(false);

  //Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const showDialogDelete = () => setVisibleDelete(true);
  const hideDialogDelete = () => setVisibleDelete(false);

  //Redux
  const dispatch = useDispatch();
  const isLeader = useSelector((state) => state.auth.isLeader);
  const isLoading = useSelector((state) => state.playerResult.isLoading);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const updatePlayerResults = useSelector(
    (state) => state.playerResult.updatePlayerResults
  );

  //Fetch player results
  const fetchResults = async () => {
    const res = await dispatch(getPlayerResults(gameId));
    if (res) {
      setPlayerResults(res.payload);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [updatePlayerResults]);

  //In Add or Edit mode
  useEffect(() => {
    const player = playerResults.find(
      (result) => result.playerId === loggedInUser.id
    );

    if (player) {
      setInEditMode(true);
      setPlayerResultId(player._id);
    } else {
      setInEditMode(false);
    }
  }, [playerResults]);

  return (
    <>
      <List.Accordion
        style={styles.accordion}
        titleStyle={{ color: "#1D182E", fontFamily: "Kodchasan_700Bold" }}
        title="Spelarresultat"
      >
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={styles.playerHeader}>Spelare</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={styles.playerHeader}>Mål</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={styles.playerHeader}>Assists</Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={styles.playerHeader}>Utv/Min</Text>
            </DataTable.Title>
          </DataTable.Header>
          {playerResults.map((result) => (
            <DataTable.Row key={result._id}>
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
        </DataTable>

        {isLoading ? (
          <ActivityIndicator size="small" color="#1D182E" />
        ) : !inEditMode && !isLeader ? (
          <Button onPress={() => showDialog()}>
            <View style={styles.controls}>
              <Icon name="plus-circle-outline" size={20} color="#787878" />
              <Text style={styles.controlText}>Lägg till...</Text>
            </View>
          </Button>
        ) : !isLeader ? (
          <Button
            onPress={() =>
              dispatch(
                deletePlayerResult({
                  playerResultId: playerResultId,
                  gameId: gameId.gameId,
                })
              )
            }
          >
            <Text style={styles.controlTextDelete}>Ta bort</Text>
          </Button>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button onPress={() => showDialog()}>
              <Text style={styles.controlText}>Lägg till...</Text>
            </Button>

            {playerResults.length > 0 && (
              <Button onPress={() => showDialogDelete()}>
                <Text style={styles.controlTextDelete}>Ta bort</Text>
              </Button>
            )}
          </View>
        )}
      </List.Accordion>
      <AddPlayerResult
        visible={visible}
        hideDialog={hideDialog}
        playerResults={playerResults}
        setPlayerResults={setPlayerResults}
        gameDate={gameDate}
        opponent={opponent}
        gameId={gameId.gameId}
      />
      <DeletePlayerResult
        visible={visibleDelete}
        hideDialog={hideDialogDelete}
        playerResults={playerResults}
        playerResultId={playerResultId}
        setPlayerResultId={setPlayerResultId}
        gameDate={gameDate}
        opponent={opponent}
        gameId={gameId.gameId}
      />
    </>
  );
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#CFCFCF",
    textAlign: "center",
    padding: 0,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  controlText: {
    color: "#787878",
    fontSize: 14,
    fontFamily: "Kodchasan_700Bold",
    marginLeft: 5,
  },
  controlTextDelete: {
    color: "red",
    fontSize: 14,
    fontFamily: "Kodchasan_700Bold",
    marginLeft: 5,
  },
  playerHeader: {
    color: "#1D182E",
    fontFamily: "Kodchasan_700Bold",
  },
  tableData: {
    color: "#1D182E",
    fontFamily: "Kodchasan_400Regular",
  },
});
