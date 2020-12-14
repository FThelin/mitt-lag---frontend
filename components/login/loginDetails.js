import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { Button, TextInput } from "react-native-paper";

export default function LoginDetails() {
  const [inputValues, setInputValues] = React.useState({
    email: "",
    password: "",
  });
  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
    console.log(inputValues);
  };
  return (
    <>
      <DarkContainer bigLogo={true}></DarkContainer>
      <LightContainer>
        <View style={styles.container}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            placeholder="Email"
            theme={{
              colors: {
                placeholder: "grey",
                text: "white",
                primary: "white",
                underlineColor: "transparent",
                background: "#252037",
              },
            }}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            value={inputValues.email}
            onChangeText={(e) => inputValue(e, "email")}
          />
          <Text style={styles.text}>Lösenord</Text>
          <TextInput
            placeholder="Lösenord"
            password={true}
            theme={{
              colors: {
                placeholder: "grey",
                text: "white",
                primary: "white",
                underlineColor: "transparent",
                background: "#252037",
              },
            }}
            style={styles.input}
            secureTextEntry={true}
            mode="outlined"
            value={inputValues.password}
            onChangeText={(e) => inputValue(e, "password")}
          />
          <Button
            onPress={() => {
              console.log(inputValues);
            }}
          >
            LOGGA IN
          </Button>
        </View>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
    color: "#F18873",
  },
  input: {
    height: 60,
    textDecorationLine: "underline",
    textDecorationColor: "white",
  },
});
