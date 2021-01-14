import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import {
  Portal,
  Button,
  Dialog,
  RadioButton,
  Divider,
  List,
} from "react-native-paper";
import { getGames } from "../../features/game/gameSlice";
import MyComponent from "./fabGroup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Games({ navigation }) {
  const [seasons, setSeasons] = useState([]);
  const [seasonGames, setSeasonGames] = useState([]);

  //Redux
  const isLeader = useSelector((state) => state.auth.isLeader);
  const activeTeam = useSelector((state) => state.team.activeTeam);
  const games = useSelector((state) => state.game.games);
  const updateGames = useSelector((state) => state.game.updateGames);
  const dispatch = useDispatch();

  //FAB
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  //Dialog
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  //Accordion
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  //RadioButtons
  const [seasonValue, setSeasonValue] = useState("");

  useEffect(() => {
    setSeasonValue("");
    fetchAllGames();
  }, [updateGames, activeTeam]);

  useEffect(() => {
    getSeasonGames();
  }, [games, seasonValue, activeTeam]);

  const fetchAllGames = async () => {
    const res = await dispatch(getGames(activeTeam._id));
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

  const setDefaultSeasonFunction = (filteredArr) => {
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
  };

  return (
    <>
      <DarkContainer text="Matcher">
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
        {isLeader && (
          <Icon
            name="plus-circle-outline"
            size={40}
            color="#F18873"
            onPress={() => navigation.navigate("CreateGame")}
          />
        )}
        {seasonGames.map((game) => (
          <View key={game._id} style={styles.matchContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{game.date}</Text>
            </View>
            <View style={styles.teamContainer}>
              <Text style={styles.teamText}>
                {game.homeGame ? activeTeam.name : game.opponent}
              </Text>
              <Text style={styles.teamGoal}>
                {game.homeGame ? game.goals : game.opponentGoals}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.teamContainer}>
              <Text style={styles.teamText}>
                {game.homeGame ? game.opponent : activeTeam.name}
              </Text>
              <Text style={styles.teamGoal}>
                {game.homeGame ? game.opponentGoals : game.goals}
              </Text>
            </View>
            <Divider style={styles.dividerBottom} />
            <List.Accordion
              style={styles.accordion}
              titleStyle={{ color: "#1D182E", fontFamily: "Kodchasan_700Bold" }}
              title="Spelarresultat"
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
          </View>
        ))}
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  matchContainer: {
    width: "95%",
    backgroundColor: "#FBFBFB",
    marginTop: 20,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    elevation: 24,
  },
  dateContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#F18873",
    padding: 5,
  },
  dateText: {
    fontFamily: "Kodchasan_300Light",
    color: "#E4E4E4",
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    padding: 6,
  },
  teamText: {
    fontSize: 18,
    fontFamily: "Kodchasan_700Bold",
    color: "#1D182E",
  },
  teamGoal: {
    fontSize: 32,
    fontFamily: "Kodchasan_700Bold",
    color: "#1D182E",
  },
  divider: {
    height: 2,
    backgroundColor: "#1D182E",
  },
  dividerBottom: {
    height: 1,
    backgroundColor: "grey",
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  },
  accordion: {
    backgroundColor: "#CFCFCF",
    textAlign: "center",
    padding: 0,
  },
});
