import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { TextInput, ActivityIndicator, RadioButton } from "react-native-paper";
import OutlinedButton from "../buttons/outlinedButton";
import BackButton from "../buttons/backButton";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../../features/game/gameSlice";
import ThrowMessage from "../throwMessage";

export default function CreateGame({ navigation }) {
  //RadioButtons
  const [homeValue, setHomeValue] = useState(true);

  const activeTeam = useSelector((state) => state.team.activeTeam);

  const [inputValues, setInputValues] = useState({
    opponent: "",
    date: "2021-02-09",
    season: "2020-2021",
  });

  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.game.isLoading);

  //Create Game
  const newGame = async () => {
    const game = {
      ...inputValues,
      homeGame: homeValue,
      teamId: activeTeam._id,
    };

    const response = await dispatch(createGame(game));
    const res = await response.payload;
    if (res) {
      navigation.navigate("Games");
    }
  };

  return (
    <>
      <DarkContainer text="Lägg till match"></DarkContainer>
      <LightContainer>
        <View>
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
          <Text style={styles.text}>Motståndarlag</Text>
          <TextInput
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
            value={inputValues.opponent}
            onChangeText={(e) => inputValue(e, "opponent")}
          />
          <Text style={styles.text}>Datum</Text>
          <TextInput
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
          <Text style={styles.text}>Säsong</Text>
          <TextInput
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
            value={inputValues.season}
            onChangeText={(e) => inputValue(e, "season")}
          />
          <Text style={styles.helperText}>
            Fyll i samtliga fält för att skapa matchen. Redigera och lägg till
            spelar resultat från matchervyn.
          </Text>
          <View style={styles.button}>
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
          </View>
          <BackButton click={() => navigation.goBack()} />
        </View>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 220,
  },
  text: {
    color: "#F18873",
    fontFamily: "Kodchasan_300Light",
  },
  helperText: {
    color: "#DEDEDE",
    fontSize: 14,
    fontFamily: "Kodchasan_600SemiBold",
    textAlign: "center",
    padding: 12,
  },
  input: {
    height: 40,
    marginBottom: 6,
  },
  logInText: {
    color: "#CFCFCF",
    fontSize: 18,
    fontFamily: "Kodchasan_700Bold",
  },
  button: { alignSelf: "center", marginTop: 10 },
  dialogTitle: {
    color: "#F18873",
    fontFamily: "Kodchasan_700Bold",
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
  },
});
