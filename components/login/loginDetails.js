import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { TextInput, ActivityIndicator, Button } from "react-native-paper";
import FilledButton from "../buttons/filledButton";
import { loginUser } from "../../features/auth/authSlice";
import ThrowMessage from "../throwMessage";

export default function LoginDetails({ navigation }) {
  const [inputValues, setInputValues] = React.useState({
    email: "",
    password: "",
  });
  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const showLoginErrorMessage = useSelector(
    (state) => state.auth.showLoginErrorMessage
  );

  const logIn = async () => {
    const response = await dispatch(loginUser(inputValues));
    const user = await response.payload;
    console.log(user);
    if (user) {
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <>
      <DarkContainer bigLogo={true}>
        {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
      </DarkContainer>
      <LightContainer>
        <Text style={styles.logInText}>Logga in...</Text>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput
              placeholder="Email"
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
              placeholder="Lösenord"
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
          <View style={{ width: "40%", alignSelf: "center", marginTop: 20 }}>
            <FilledButton
              buttonText="LOGGA IN"
              click={() => logIn()}
            ></FilledButton>
            <Button
              icon="keyboard-backspace"
              color="#F18873"
              onPress={() => navigation.goBack()}
            >
              TILLBAKA
            </Button>
          </View>
        </View>
        {showLoginErrorMessage && (
          <ThrowMessage message="Fel email eller lösenord" />
        )}
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
