import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ManageTeamNoTeam({ navigation }) {
  return (
    <>
      <DarkContainer>
        <Text style={styles.headLineText}>
          Du är inte med i något lag ännu. Gå med i ett lag eller bli lagledare
          för ett nytt lag.
        </Text>
      </DarkContainer>
      <LightContainer extraStyle={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.container}>
          <View style={styles.childContainer}>
            <Button onPress={() => navigation.navigate("RegisterTeam")}>
              <Icon
                name="account-multiple-plus-outline"
                size={65}
                color="#F18873"
              />
            </Button>
            <Text style={styles.iconText}>NYTT LAG</Text>
          </View>
          <View style={styles.childContainer}>
            <Button onPress={() => navigation.navigate("FindTeam")}>
              <Icon name="arrow-decision" size={65} color="#F18873" />
            </Button>
            <Text style={styles.iconText}>GÅ MED</Text>
          </View>
        </View>
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "70%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  childContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
  },
  headLineText: {
    color: "#CFCFCF",
    fontSize: 14,
    fontFamily: "Kodchasan_700Bold",
    textAlign: "center",
  },
  iconText: {
    fontFamily: "Kodchasan_700Bold",
    color: "#CFCFCF",
    fontSize: 20,
  },
});
