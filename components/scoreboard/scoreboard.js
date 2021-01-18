import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayerResultsTeam } from "../../features/playerResult/playerResultSlice";
import { View, Text, StyleSheet } from "react-native";
import {
  DataTable,
  Button,
  Portal,
  Dialog,
  RadioButton,
} from "react-native-paper";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";

export default function Scoreboard() {
  const [seasons, setSeasons] = useState([]);
  const [seasonGames, setSeasonGames] = useState([]);
  const [seasonResults, setSeasonResults] = useState([]);
  const [scores, setScores] = useState([]);

  //Redux
  const activeTeam = useSelector((state) => state.team.activeTeam);
  const games = useSelector((state) => state.playerResult.games);
  const dispatch = useDispatch();

  //Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  //RadioButtons
  const [seasonValue, setSeasonValue] = useState("");

  useEffect(() => {
    setSeasonValue("");
    fetchAllGames();
  }, [activeTeam]);

  useEffect(() => {
    getSeasonGames();
  }, [games, seasonValue, activeTeam]);

  const fetchAllGames = async () => {
    const res = await dispatch(getPlayerResultsTeam(activeTeam._id));
    if (res) {
      await getSeasons(res.payload);
    }
  };

  const getSeasons = async (allGames) => {
    let seasonArr = [];
    for (const s of allGames) {
      seasonArr.push(s.season);
    }
    const filteredArr = [...new Set(seasonArr)];
    await setSeasons(filteredArr);
    setDefaultSeasonFunction(filteredArr);
  };

  const setDefaultSeasonFunction = async (filteredArr) => {
    if (filteredArr.length != 0) {
      let currentSeason = 0;

      for (const season of filteredArr) {
        const year1 = parseInt(season.slice(0, 4));
        const year2 = parseInt(season.slice(5, 9));

        const sum = year1 + year2;

        if (sum > currentSeason) {
          currentSeason = sum;
          setSeasonValue(season);
        }
      }
    }
  };

  const getSeasonGames = () => {
    const sg = games.filter((game) => game.season === seasonValue);
    setSeasonGames(sg);
    calculateResults(sg);
  };

  const calculateResults = (games) => {
    let playerArr = [];
    for (const player of games) {
      for (const res of player.playerResult) {
        playerArr.push({ ...res, games: 1, score: res.goals + res.assists });
      }
    }
    setSeasonResults(playerArr);
  };

  useEffect(() => {
    if (seasonResults.length > 0) {
      let properties = ["goals", "assists", "penalties", "games", "score"];

      let map = seasonResults.reduce(function (map, e) {
        map[e.playerId] = properties.map(function (property, i) {
          return +e[property] + ((map[e.playerId] || [])[i] || 0);
        });
        return map;
      }, {});

      let result = Object.keys(map).map(function (k) {
        return map[k].reduce(
          function (object, e, i) {
            object[properties[i]] = e;
            return object;
          },
          { Player: k }
        );
      });

      let sortedList = result.sort((a, b) =>
        a.goals + a.assists < b.goals + b.assists ? 1 : -1
      );

      let merged = [];

      for (let i = 0; i < sortedList.length; i++) {
        merged.push({
          ...sortedList[i],
          ...seasonResults.find((itmInner) =>
            itmInner.playerId === sortedList[i].Player
              ? (sortedList[i] = {
                  ...sortedList[i],
                  name: itmInner.playerName,
                })
              : null
          ),
        });
      }
      setScores(sortedList);
    }
  }, [seasonResults]);

  return (
    <>
      <DarkContainer text="Poängliga">
        <View>
          <Button onPress={showDialog}>
            <Text style={{ color: "#F18873", fontFamily: "Kodchasan_700Bold" }}>
              {seasonValue.replace("-", " / ")}
            </Text>
          </Button>
          <Portal>
            <Dialog
              style={styles.dialog}
              visible={visible}
              onDismiss={hideDialog}
            >
              <Dialog.Title style={styles.dialogTitle}>
                Välj säsong
              </Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group
                  onValueChange={(newValue) => setSeasonValue(newValue)}
                  value={seasonValue}
                >
                  {seasons.map((season, index) => (
                    <View style={styles.radioButtonContainer} key={index}>
                      <Text style={styles.dialogText}>{season}</Text>
                      <RadioButton color={"#F18873"} value={season} />
                    </View>
                  ))}
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>
                  <Text
                    style={{
                      color: "#1D182E",
                      fontFamily: "Kodchasan_700Bold",
                    }}
                  >
                    ok
                  </Text>
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </DarkContainer>
      <LightContainer>
        <View style={styles.mainContainer}>
          <DataTable>
            <DataTable.Header>
              <View style={styles.leftContainer}>
                <DataTable.Title>
                  <Text style={styles.playerHeader2}>Spelare</Text>
                </DataTable.Title>
              </View>
              <View style={styles.rightContainer}>
                <DataTable.Title numeric>
                  <Text style={styles.playerHeader}>GP</Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                  <Text style={styles.playerHeader}>G</Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                  <Text style={styles.playerHeader}>A</Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                  <Text style={styles.playerHeader}>PIM</Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                  <Text style={styles.playerHeader}>TP</Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                  <Text style={styles.playerHeader}>/</Text>
                </DataTable.Title>
              </View>
            </DataTable.Header>
            {scores.map((result, index) => (
              <DataTable.Row key={result.Player}>
                <View style={styles.leftContainer}>
                  <DataTable.Cell style={styles.tableData2}>
                    <Text>{index + 1 + ". " + result.name}</Text>
                  </DataTable.Cell>
                </View>
                <View style={styles.rightContainer}>
                  <DataTable.Cell numeric style={styles.tableData}>
                    <Text>{result.games}</Text>
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
                  <DataTable.Cell numeric>
                    <Text style={styles.totalScores}>{result.score}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.tableData}>
                    <Text>
                      {Math.floor((result.score / result.games) * 100) / 100}
                    </Text>
                  </DataTable.Cell>
                </View>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
        <View style={styles.help}>
          <Text style={styles.helpText}>GP: Matcher spelade </Text>
          <Text style={styles.helpText}>G: Mål</Text>
          <Text style={styles.helpText}>A: Assist</Text>
          <Text style={styles.helpText}>PIM: Utvisningar i minuter</Text>
          <Text style={styles.helpText}>TP: Totalpoäng</Text>
          <Text style={styles.helpText}>/: Poäng per match</Text>
        </View>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    width: "100%",
  },
  playerHeader: {
    width: 100,
    color: "#1D182E",
    fontFamily: "Kodchasan_700Bold",
  },
  playerHeader2: {
    color: "#1D182E",
    fontFamily: "Kodchasan_700Bold",
    justifyContent: "flex-start",
  },
  tableData: {
    color: "#1D182E",
    fontFamily: "Kodchasan_400Regular",
  },
  tableData2: {
    width: 100,
    color: "#1D182E",
    fontFamily: "Kodchasan_400Regular",
    justifyContent: "flex-start",
  },
  totalScores: {
    color: "#1D182E",
    fontFamily: "Kodchasan_700Bold",
  },
  leftContainer: {
    width: "40%",
  },
  rightContainer: {
    width: "60%",
    flexDirection: "row",
  },
  help: {
    width: "100%",
    marginTop: 20,
  },
  helpText: {
    color: "#F18873",
    fontFamily: "Kodchasan_400Regular",
  },
});
