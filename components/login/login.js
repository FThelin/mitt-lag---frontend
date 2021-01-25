import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LightContainer from "../lightContainer";
import DarkContainer from "../darkContainer";
import FilledButton from "../buttons/filledButton";
import OutlinedButton from "../buttons/outlinedButton";

export default function Login({ navigation }) {
  //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <DarkContainer bigLogo="true"></DarkContainer>
      <LightContainer extraStyle={{ justifyContent: "center", flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.text}>Välkommen till SCORIFY!</Text>
          <FilledButton
            buttonText="LOGGA IN"
            click={() => navigation.navigate("LoginDetails")}
          />
          <OutlinedButton
            buttonText="SKAPA KONTO"
            click={() => navigation.navigate("Register")}
          />
        </View>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#CFCFCF",
    fontSize: 18,
    fontFamily: "Kodchasan_700Bold",
  },
});
