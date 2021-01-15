import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayerResults } from "../../features/playerResult/playerResultSlice";
import { List, Button, ActivityIndicator, DataTable } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AddPlayerResult from "./addPlayerResult";

export default function PlayerResult(props) {
  const { gameId, opponent, gameDate } = props;
  const [playerResults, setPlayerResults] = useState([]);
  const [inEditMode, setInEditMode] = useState(false);

  //Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.playerResult.isLoading);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  //Fetch player results
  const fetchResults = async () => {
    const res = await dispatch(getPlayerResults(gameId));
    if (res) {
      setPlayerResults(res.payload);
    }
  };

  //In Add or Edit mode
  useEffect(() => {
    const player = playerResults.find(
      (result) => result.playerId === loggedInUser.id
    );

    if (player) {
      setInEditMode(true);
    } else {
      setInEditMode(false);
    }
  }, [playerResults]);

  const createItems = () => {
    return items;
  };

  return (
    <>
      <List.Accordion
        style={styles.accordion}
        titleStyle={{ color: "#1D182E", fontFamily: "Kodchasan_700Bold" }}
        title="Spelarresultat"
        onPress={() => fetchResults()}
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
          {console.log(playerResults)}
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
        ) : !inEditMode ? (
          <Button onPress={() => showDialog()}>
            <View style={styles.controls}>
              <Icon name="plus-circle-outline" size={20} color="#787878" />
              <Text style={styles.controlText}>Lägg till...</Text>
            </View>
          </Button>
        ) : (
          <Button onPress={() => console.log("edit mode")}>
            <View style={styles.controls}>
              <Icon name="pen" size={20} color="#787878" />
              <Text style={styles.controlText}>Redigera</Text>
            </View>
          </Button>
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
  playerHeader: {
    color: "#1D182E",
    fontFamily: "Kodchasan_700Bold",
  },
  tableData: {
    color: "#1D182E",
    fontFamily: "Kodchasan_400Regular",
  },
});
