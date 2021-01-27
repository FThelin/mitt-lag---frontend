import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import OutlinedButton from "../buttons/outlinedButton";
import { logoutUser } from "../../features/auth/authSlice";

export default function Header() {
  // Redux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  // Logout API
  const logOut = async () => {
    const response = await dispatch(logoutUser());
    const user = await response.payload;
  };

  return (
    <View style={styles.header}>
      <OutlinedButton
        buttonText={
          !isLoading ? (
            <Text>LOGGA UT</Text>
          ) : (
            <ActivityIndicator size="small" color="#ffffff" />
          )
        }
        click={() => logOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#252037",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: 90,
    padding: 8,
  },
});
