import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { TextInput, ActivityIndicator } from "react-native-paper";
import OutlinedButton from "../buttons/outlinedButton";
import { registerUser } from "../../features/auth/authSlice";

export default function LoginDetails({ navigation }) {
  const [inputValues, setInputValues] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const inputValue = (input, anchor) => {
    setInputValues({ ...inputValues, [anchor]: input });
  };

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const register = () => {
    dispatch(registerUser(inputValues));
    navigation.navigate("Login");
  };

  return (
    <>
      <DarkContainer>
        <Text style={styles.registerText}>Registrera dig...</Text>
        {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
      </DarkContainer>
      <LightContainer>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Förnamn</Text>
            <TextInput
              placeholder="Förnamn"
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
              placeholder="Efternamn"
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
          <View style={{ alignSelf: "center" }}>
            <OutlinedButton
              buttonText="SKAPA KONTO"
              click={() => register()}
            ></OutlinedButton>
          </View>
        </View>
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
  },
  input: {
    height: 40,
  },
  registerText: {
    color: "#CFCFCF",
    fontSize: 18,
    fontFamily: "Kodchasan_700Bold",
  },
});
