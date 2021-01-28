import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { TextInput, ActivityIndicator, RadioButton } from "react-native-paper";
import OutlinedButton from "../buttons/outlinedButton";
import BackButton from "../buttons/backButton";
import { useDispatch, useSelector } from "react-redux";
import { createGame, updateGame } from "../../features/game/gameSlice";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ThrowMessage from "../throwMessage";

export default function CreateGame({ navigation, route }) {
  // RadioButtons
  const [homeValue, setHomeValue] = useState(true);
  const edit = route.params.edit;
  // Redux
  const dispatch = useDispatch();
  const activeTeam = useSelector((state) => state.team.activeTeam);
  const isLoading = useSelector((state) => state.game.isLoading);
  const errorMessage = useSelector((state) => state.game.errorMessage);

  // State for inputs
  const [inputValues, setInputValues] = useState({
    opponent: "",
    date: "",
    seasonStart: 0,
    seasonEnd: 0,
    goals: 0,
    opponentGoals: 0,
  });
  // Set state for input
  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  // Get current year
  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    if (currentMonth <= 5) {
      setInputValues({
        ...inputValues,
        seasonEnd: currentYear,
        seasonStart: currentYear - 1,
      });
    } else {
      setInputValues({
        ...inputValues,
        seasonStart: currentYear,
        seasonEnd: currentYear + 1,
      });
    }
  }, []);
  // UseEffect on update to get route params
  useEffect(() => {
    const {
      date,
      opponent,
      goals,
      opponentGoals,
      homeGame,
      seasonStart,
      seasonEnd,
    } = route.params;

    if (edit) {
      setHomeValue(homeGame);
      setInputValues({
        ...inputValues,
        date,
        opponent,
        goals,
        opponentGoals,
        seasonStart,
        seasonEnd,
      });
    }
  }, []);

  // Add and subtract year to season
  const incrementSeason = () => {
    setInputValues({
      ...inputValues,
      seasonStart: inputValues.seasonStart + 1,
      seasonEnd: inputValues.seasonEnd + 1,
    });
  };
  const decrementSeason = () => {
    setInputValues({
      ...inputValues,
      seasonStart: inputValues.seasonStart - 1,
      seasonEnd: inputValues.seasonEnd - 1,
    });
  };

  // Create Game API
  const newGame = async () => {
    const s1 = inputValues.seasonStart.toString();
    const s2 = inputValues.seasonEnd.toString();
    const season = s1 + "-" + s2;

    if (inputValues.goals.length === 0) {
      setInputValues({ ...inputValues, goals: (inputValues.goals = 0) });
    }
    if (inputValues.opponentGoals.length === 0) {
      setInputValues({
        ...inputValues,
        opponentGoals: (inputValues.opponentGoals = 0),
      });
    }
    const game = {
      date: inputValues.date,
      opponent: inputValues.opponent,
      goals: parseInt(inputValues.goals),
      opponentGoals: parseInt(inputValues.opponentGoals),
      season: season,
      homeGame: homeValue,
      teamId: activeTeam._id,
    };

    const response = await dispatch(createGame(game));
    const res = await response.payload;
    if (res.success === true) {
      navigation.navigate("Games");
    }
  };

  // Update Game API
  const updateGameFunction = async () => {
    const s1 = inputValues.seasonStart.toString();
    const s2 = inputValues.seasonEnd.toString();
    const season = s1 + "-" + s2;

    const game = {
      gameId: route.params.gameId,
      date: inputValues.date,
      opponent: inputValues.opponent,
      goals: parseInt(inputValues.goals),
      opponentGoals: parseInt(inputValues.opponentGoals),
      season: season,
      homeGame: homeValue,
    };

    const response = await dispatch(updateGame(game));
    const res = await response.payload;
    if (res) {
      navigation.navigate("Games");
    }
  };

  return (
    <>
      <DarkContainer
        text={edit ? "Uppdatera match" : "Lägg till match"}
      ></DarkContainer>
      <LightContainer extraStyle={{ flex: 1 }}>
        <Text style={styles.teamText}>Mitt lag</Text>
        <View style={styles.myTeamContainer}>
          <Text style={styles.myTeamText}>{activeTeam.name}</Text>
          <TextInput
            label={"Mål"}
            keyboardType="numeric"
            theme={{
              colors: {
                placeholder: "grey",
                text: "white",
                primary: "white",
                background: "#252037",
              },
            }}
            style={styles.goalInput}
            mode="outlined"
            value={inputValues.goals.toString()}
            onChangeText={(e) => inputValue(e, "goals")}
          />
        </View>
        <Text style={styles.teamText}>Motståndarlag</Text>
        <View style={styles.myTeamContainer}>
          <TextInput
            theme={{
              colors: {
                placeholder: "grey",
                text: "white",
                primary: "white",
                background: "#252037",
              },
            }}
            style={styles.opponentInput}
            mode="outlined"
            value={inputValues.opponent}
            onChangeText={(e) => inputValue(e, "opponent")}
          />
          <TextInput
            label={"Mål"}
            keyboardType="numeric"
            theme={{
              colors: {
                placeholder: "grey",
                text: "white",
                primary: "white",
                background: "#252037",
              },
            }}
            style={styles.goalInput}
            mode="outlined"
            value={inputValues.opponentGoals.toString()}
            onChangeText={(e) => inputValue(e, "opponentGoals")}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Datum</Text>
          <TextInput
            keyboardType="numeric"
            theme={{
              colors: {
                placeholder: "grey",
                text: "white",
                primary: "white",
                background: "#252037",
              },
            }}
            style={styles.input}
            mode="outlined"
            value={inputValues.date}
            onChangeText={(e) => inputValue(e, "date")}
          />
          <Text style={styles.text}>Säsong (start - slut)</Text>
          <View style={styles.seasonContainer}>
            <TextInput
              editable={false}
              theme={{
                colors: {
                  placeholder: "grey",
                  text: "white",
                  primary: "white",
                  background: "#252037",
                },
              }}
              style={styles.inputSeason}
              mode="outlined"
              value={inputValues.seasonStart.toString()}
              onChangeText={(e) => inputValue(e, "seasonStart")}
            />
            <TextInput
              editable={false}
              theme={{
                colors: {
                  placeholder: "grey",
                  text: "white",
                  primary: "white",
                  background: "#252037",
                },
              }}
              style={styles.inputSeason}
              mode="outlined"
              value={inputValues.seasonEnd.toString()}
              onChangeText={(e) => inputValue(e, "seasonEnd")}
            />
            <View style={styles.iconContainer}>
              <Icon
                name="arrow-left-bold-box"
                size={25}
                color="#F18873"
                onPress={() => decrementSeason()}
              />
              <Icon
                name="arrow-right-bold-box"
                size={25}
                color="#F18873"
                onPress={() => incrementSeason()}
              />
            </View>
          </View>
          <View>
            <RadioButton.Group
              onValueChange={(newValue) => setHomeValue(newValue)}
              value={homeValue}
            >
              <View style={styles.homeAwayContainer}>
                <Text style={styles.homeAwayText}>Hemma</Text>
                <Text style={styles.homeAwayText}>Borta</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton color={"white"} value={true} />
                <RadioButton color={"white"} value={false} />
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={styles.button}>
          {edit ? (
            <OutlinedButton
              buttonText={
                !isLoading ? (
                  <Text>UPPDATERA MATCH</Text>
                ) : (
                  <ActivityIndicator size="small" color="#ffffff" />
                )
              }
              click={() => updateGameFunction()}
            />
          ) : (
            <OutlinedButton
              buttonText={
                !isLoading ? (
                  <Text>SKAPA MATCH</Text>
                ) : (
                  <ActivityIndicator size="small" color="#ffffff" />
                )
              }
              click={() => newGame()}
            />
          )}
        </View>
        <BackButton click={() => navigation.goBack()} />
        {!!errorMessage && (
          <ThrowMessage style={{ bottom: 0 }} message={errorMessage} />
        )}
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: 40,
    marginBottom: 6,
  },
  text: {
    color: "#F18873",
    fontFamily: "Kodchasan_300Light",
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    color: "white",
  },
  homeAwayContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  homeAwayText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Kodchasan_600SemiBold",
    color: "#F18873",
    fontFamily: "Kodchasan_700Bold",
  },
  seasonContainer: {
    flexDirection: "row",
  },
  inputSeason: {
    height: 40,
    marginBottom: 10,
    width: "40%",
  },
  iconContainer: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
  },
  myTeamContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  myTeamText: {
    color: "#DEDEDE",
    fontFamily: "Kodchasan_700Bold",
    fontSize: 18,
  },
  goalInput: {
    height: 40,
    marginBottom: 6,
    width: "15%",
  },
  teamText: {
    color: "#F18873",
    fontFamily: "Kodchasan_300Light",
    alignSelf: "flex-start",
  },
  opponentInput: {
    height: 40,
    marginBottom: 6,
    width: "80%",
  },
});
