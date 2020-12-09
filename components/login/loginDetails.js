import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
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
    <View style={styles.container}>
      <Text>E-mail</Text>
      <TextInput
        label="E-mail"
        value={inputValues.email}
        onChangeText={(e) => inputValue(e, "email")}
      />
      <Text>Lösenord</Text>
      <TextInput
        label="Lösenord"
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
