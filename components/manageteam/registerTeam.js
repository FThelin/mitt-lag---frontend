import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { TextInput } from "react-native-paper";

import OutlinedButton from "../buttons/outlinedButton";

export default function RegisterTeam() {
  const [inputValues, setInputValues] = React.useState({
    teamName: "",
    city: "",
    sport: "",
  });

  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  return (
    <>
      <DarkContainer>
        <Text
          style={{
            fontSize: 18,
            color: "#CECECE",
            fontFamily: "Kodchasan_500Medium",
          }}
        >
          Registrera lag...
        </Text>
      </DarkContainer>
      <LightContainer>
        <View style={styles.container}>
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
            value={inputValues.teamName}
            onChangeText={(e) => inputValue(e, "teamName")}
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
          <Text style={styles.text}>Välj lag</Text>
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
          <Text style={styles.helperText}>
            När du skapar ett lag blir du automatiskt lagledare, och kan hantera
            personer och matchresultat.
          </Text>
          <View style={styles.button}>
            <OutlinedButton buttonText="SKAPA LAG" />
          </View>
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
  button: { alignSelf: "center" },
});
