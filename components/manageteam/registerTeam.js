import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { setNavigationIndex } from "../../features/navigaton/navigationSlice";
import { TextInput, ActivityIndicator } from "react-native-paper";
import OutlinedButton from "../buttons/outlinedButton";
import BackButton from "../buttons/backButton";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, getTeam } from "../../features/team/teamSlice";
import ThrowMessage from "../throwMessage";

export default function RegisterTeam({ navigation }) {
  const [inputValues, setInputValues] = useState({
    name: "",
    city: "",
    sport: "",
  });

  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.team.errorMessage);
  const success = useSelector((state) => state.team.success);
  const isLoading = useSelector((state) => state.team.isLoading);

  //Create Team
  const newTeam = async () => {
    const response = await dispatch(createTeam(inputValues));
    const team = await response.payload;
    if (!typeof team === "string") {
      await dispatch(getTeam(team._id));
      Alert.alert(
        "Skapa lag",
        "Laget skapades. Nu kan du lägga till matcher.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("ManageTeam");
            },
          },
        ]
      );
    }
  };

  return (
    <>
      <DarkContainer text="Registrera lag"></DarkContainer>
      <LightContainer extraStyle={{ justifyContent: "center", flex: 1 }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Lagnamn</Text>
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
              value={inputValues.name}
              onChangeText={(e) => inputValue(e, "name")}
            />
            <Text style={styles.text}>Stad</Text>
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
              value={inputValues.city}
              onChangeText={(e) => inputValue(e, "city")}
            />
            <Text style={styles.text}>Sport</Text>
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
              value={inputValues.sport}
              onChangeText={(e) => inputValue(e, "sport")}
            />
          </View>
          <Text style={styles.helperText}>
            När du skapar ett lag blir du lagledare, och kan hantera spelare och
            matchresultat.
          </Text>
          <View style={styles.button}>
            <OutlinedButton
              buttonText={
                !isLoading ? (
                  <Text>SKAPA LAG</Text>
                ) : (
                  <ActivityIndicator size="small" color="#ffffff" />
                )
              }
              click={() => newTeam()}
            />
          </View>
          <BackButton click={() => navigation.goBack()} />
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            {!!errorMessage && <ThrowMessage message={errorMessage} />}
          </View>
        </View>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
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
});
