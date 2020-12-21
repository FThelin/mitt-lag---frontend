import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import OutlinedButton from "../buttons/outlinedButton";
import { logoutUser } from "../../features/auth/authSlice";

export default function Header() {
  //Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  //Logout
  const logOut = async () => {
    const response = await dispatch(logoutUser());
    const user = await response.payload;
    console.log(user);
  };

  return (
    <View style={styles.header}>
      <Button compact={true}>
        <Icon name="bars" size={25} color="#CECECE" />
      </Button>
      <OutlinedButton buttonText="Logga ut" click={() => logOut()} />
      {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#252037",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 90,
    padding: 8,
  },
});
