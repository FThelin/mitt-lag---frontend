import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Alert } from "react-native";
import DarkContainer from "../darkContainer";
import ThrowMessage from "../throwMessage";
import LightContainer from "../lightContainer";
import {
  HelperText,
  TextInput,
  ActivityIndicator,
  Modal,
  Portal,
} from "react-native-paper";
import OutlinedButton from "../buttons/outlinedButton";
import BackButton from "../buttons/backButton";
import { registerUser } from "../../features/auth/authSlice";

export default function LoginDetails({ navigation }) {
  //Input fields
  const [inputValues, setInputValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  // Error message
  const hasErrorEmail = () => {
    return !inputValues.email.includes("@");
  };
  const hasErrorPassword = () => {
    return inputValues.password.length < 6;
  };

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  //Register
  const register = async () => {
    const response = await dispatch(registerUser(inputValues));
    const data = await response.payload;
    if (data._id) {
      Alert.alert(
        "Skapa konto",
        "Registreringen lyckades. Nu kan du prova att logga in",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("LoginDetails", { email: inputValues.email });
            },
          },
        ]
      );
    }
  };

  return (
    <>
      <DarkContainer text="Registrera dig">
        {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
      </DarkContainer>
      <LightContainer>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Förnamn</Text>
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
              value={inputValues.firstname}
              onChangeText={(e) => inputValue(e, "firstname")}
            />
          </View>
          <View>
            <Text style={styles.text}>Efternamn</Text>
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
              value={inputValues.lastname}
              onChangeText={(e) => inputValue(e, "lastname")}
            />
          </View>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput
              autoCapitalize="none"
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
              keyboardType="email-address"
              value={inputValues.email}
              onChangeText={(e) => inputValue(e, "email")}
            />
            {!!inputValues.email && (
              <HelperText type="error" visible={hasErrorEmail()}>
                Email bör innehålla @
              </HelperText>
            )}
          </View>
          <View>
            <Text style={styles.text}>Lösenord</Text>
            <TextInput
              password={true}
              theme={{
                colors: {
                  placeholder: "grey",
                  text: "white",
                  primary: "white",
                  background: "#252037",
                },
              }}
              style={styles.input}
              secureTextEntry={true}
              mode="outlined"
              value={inputValues.password}
              onChangeText={(e) => inputValue(e, "password")}
            />
            {!!inputValues.password && (
              <HelperText type="error" visible={hasErrorPassword()}>
                Minst 6 tecken
              </HelperText>
            )}
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <OutlinedButton buttonText="SKAPA KONTO" click={() => register()} />
            <BackButton click={() => navigation.goBack()}> </BackButton>
          </View>
        </View>

        {!!errorMessage && <ThrowMessage message={errorMessage} />}
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    justifyContent: "space-between",
  },
  text: {
    color: "#F18873",
    fontFamily: "Kodchasan_300Light",
  },
  input: {
    height: 40,
  },
  modalStyle: {
    backgroundColor: "#CECECE",
    width: "80%",
    height: 100,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 5,
    alignSelf: "center",
  },
});
