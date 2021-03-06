import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { TextInput, ActivityIndicator } from "react-native-paper";
import FilledButton from "../buttons/filledButton";
import BackButton from "../buttons/backButton";
import { loginUser } from "../../features/auth/authSlice";
import ThrowMessage from "../throwMessage";

export default function LoginDetails({ navigation, route }) {
  // Auto fill user email if coming from register
  useEffect(() => {
    if (route.params) {
      setInputValues({ email: route.params.email });
    }
  }, []);

  // Input fields
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  // Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth.errorMessage);

  // Login API
  const logIn = async () => {
    const response = await dispatch(loginUser(inputValues));
    const user = await response.payload;
    if (user != "Användare eller lösenord matchar inte") {
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <>
      <DarkContainer bigLogo={true}>
        {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
      </DarkContainer>
      <LightContainer extraStyle={{ flex: 1 }}>
        <Text style={styles.logInText}>Logga in...</Text>
        <View style={styles.container}>
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
          </View>
          <View style={{ width: "50%", alignSelf: "center", marginTop: 20 }}>
            <FilledButton
              buttonText="LOGGA IN"
              click={() => logIn()}
            ></FilledButton>
            <BackButton click={() => navigation.goBack()}></BackButton>
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
    height: 220,
    justifyContent: "space-between",
  },
  text: {
    color: "#F18873",
    fontFamily: "Kodchasan_300Light",
  },
  input: {
    height: 40,
  },
  logInText: {
    color: "#CFCFCF",
    fontSize: 18,
    fontFamily: "Kodchasan_700Bold",
  },
});
