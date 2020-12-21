import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import ThrowMessage from "../throwMessage";
import LightContainer from "../lightContainer";
import {
  HelperText,
  TextInput,
  ActivityIndicator,
  Button,
  Modal,
  Portal,
} from "react-native-paper";
import OutlinedButton from "../buttons/outlinedButton";
import { registerUser } from "../../features/auth/authSlice";
import FilledButton from "../buttons/filledButton";

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
  const hasError = () => {
    return !inputValues.email.includes("@");
  };

  //Modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    navigation.navigate("Login");
  };

  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const showRegisterErrorMessage = useSelector(
    (state) => state.auth.showRegisterErrorMessage
  );

  //Register
  const register = async () => {
    const response = await dispatch(registerUser(inputValues));
    const user = await response.payload;
    if (user) {
      showModal();
    }
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
            {inputValues.email && (
              <HelperText type="error" visible={hasError()}>
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
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <OutlinedButton buttonText="SKAPA KONTO" click={() => register()} />
            <Button
              icon="keyboard-backspace"
              color="#F18873"
              onPress={() => navigation.goBack()}
            >
              <Text style={{ fontFamily: "Kodchasan_300Light" }}>TILLBAKA</Text>
            </Button>
          </View>
        </View>
        {showRegisterErrorMessage && (
          <ThrowMessage message="Kan inte skapa användare..." />
        )}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalStyle}
          >
            <Text style={{ fontFamily: "Kodchasan_600SemiBold" }}>
              Användare skapad. Nu kan du logga in!
            </Text>
            <FilledButton
              buttonText="SWEET!"
              click={() => navigation.navigate("Login")}
            />
          </Modal>
        </Portal>
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
  registerText: {
    color: "#CFCFCF",
    fontSize: 18,
    fontFamily: "Kodchasan_700Bold",
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
