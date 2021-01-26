import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  TextInput,
  Divider,
  ActivityIndicator,
  Button,
  Modal,
  Portal,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import OutlinedButton from "../buttons/outlinedButton";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { findTeam, createRequest } from "../../features/team/teamSlice";
import FilledButton from "../buttons/filledButton";
import BackButton from "../buttons/backButton";
import { setNavigationIndex } from "../../features/navigaton/navigationSlice";

export default function searchTeam({ navigation }) {
  //Internal state
  const [chosenTeam, setChosenTeam] = useState({
    id: "",
    name: "",
  });

  const apply = (id, name) => {
    showModal();
    setChosenTeam({ id, name });
  };

  //Modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //Redux
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.team.searchResults);
  const isLoading = useSelector((state) => state.team.isLoading);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  //Text inputs
  const [inputValues, setInputValues] = useState({
    query: "",
    message: "Hej, jag vill gärna gå med i erat lag",
  });

  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  //Replace blank space in search query
  const replaceSpace = () => {
    const replaced = inputValues.query.replace(/\s/g, "&");
    return replaced;
  };

  //Send request
  const sendRequest = async () => {
    const response = await dispatch(
      createRequest({
        teamId: chosenTeam.id,
        player: loggedInUser.id,
        message: inputValues.message,
      })
    );

    const request = await response.payload.success;
    if (request) {
      hideModal();
      dispatch(setNavigationIndex(0));
    }
  };

  return (
    <>
      <DarkContainer text="Hitta lag"></DarkContainer>
      <LightContainer>
        <View style={{ width: "100%" }}>
          <Text style={styles.text}>Sökord</Text>
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
            value={inputValues.query}
            onChangeText={(e) => inputValue(e, "query")}
          />
        </View>
        <OutlinedButton
          buttonText="Sök"
          click={() => dispatch(findTeam(replaceSpace()))}
        />
        <BackButton click={() => navigation.goBack()} />
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Resultat:</Text>
          <Divider style={styles.divider} />
          {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
          {searchResults.map((result) => (
            <View key={result._id} style={styles.result}>
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    color: "#070707",
                    fontFamily: "Kodchasan_700Bold",
                    fontSize: 18,
                  }}
                >
                  {result.name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Kodchasan_300Light",
                    }}
                  >
                    {result.city + "    "}
                  </Text>
                  <Text
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Kodchasan_300Light",
                    }}
                  >
                    {result.sport}
                  </Text>
                </View>
              </View>
              {result.leaders.includes(loggedInUser.id) ||
              result.players.includes(loggedInUser.id) ? (
                <Button
                  labelStyle={{
                    fontFamily: "Kodchasan_700Bold",
                    color: "white",
                  }}
                  style={styles.buttonDisabled}
                  mode="contained"
                  disabled={true}
                >
                  Medlem
                </Button>
              ) : (
                <Button
                  labelStyle={{
                    fontFamily: "Kodchasan_700Bold",
                    color: "#070707",
                  }}
                  style={styles.button}
                  mode="contained"
                  onPress={() => apply(result._id, result.name)}
                >
                  Ansök
                </Button>
              )}
            </View>
          ))}
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Text
              style={{ fontFamily: "Kodchasan_700Bold" }}
            >{`Skicka förfrågan till ${chosenTeam.name}`}</Text>
            <TextInput
              multiline={true}
              value={inputValues.message}
              onChangeText={(e) => inputValue(e, "message")}
            />
            {isLoading && <ActivityIndicator size="small" color="#070707" />}
            <FilledButton
              buttonText="Skicka förfrågan"
              click={() => sendRequest()}
            />
            <Button
              labelStyle={{
                fontFamily: "Kodchasan_700Bold",
                color: "#070707",
              }}
              onPress={() => setInputValues({ ...inputValues, message: "" })}
            >
              Rensa
            </Button>
          </Modal>
        </Portal>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#F18873",
    fontFamily: "Kodchasan_300Light",
  },
  input: {
    height: 40,
    marginBottom: 16,
  },
  resultText: {
    color: "#CECECE",
    fontFamily: "Kodchasan_300Light",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 16,
  },
  result: {
    backgroundColor: "#FBFBFB",
    flexDirection: "row",
    padding: 7,
    borderRadius: 3,
    marginBottom: 5,
  },
  divider: {
    backgroundColor: "#DEDEDE",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6FEFA2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "grey",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    alignSelf: "center",
    height: 300,
    justifyContent: "space-around",
  },
});
