import React from "react";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import BackButton from "../buttons/backButton";
import { acceptRequest, deleteRequest } from "../../features/team/teamSlice";

export default function HandleRequests({ navigation }) {
  const activeTeam = useSelector((state) => state.team.activeTeam);
  const isLoading = useSelector((state) => state.team.isLoading);
  const dispatch = useDispatch();

  const trimDate = (date) => {
    return date.slice(0, 10);
  };

  return (
    <>
      <DarkContainer text="Hantera förfrågningar"></DarkContainer>
      <LightContainer>
        <BackButton click={() => navigation.goBack()} />
        {activeTeam.requests.map((request) => (
          <View style={styles.card} key={request._id}>
            <View style={styles.topContainer}>
              <Text style={styles.name}>{request.player}</Text>
              <Text style={styles.date}>{trimDate(request.createdAt)}</Text>
            </View>
            <Text style={styles.messageHead}>Meddelande:</Text>
            <Text style={styles.message}>{request.message}</Text>
            <View style={styles.buttonContainer}>
              <Button
                mode={"contained"}
                icon="check"
                style={styles.yesButton}
                loading={isLoading}
                onPress={() =>
                  dispatch(
                    acceptRequest({
                      requestId: request._id,
                      teamId: activeTeam._id,
                    })
                  )
                }
              >
                <Text style={styles.yesButtonText}>GODKÄNN</Text>
              </Button>
              <Button
                mode={"contained"}
                icon="block-helper"
                style={styles.noButton}
                loading={isLoading}
                onPress={() =>
                  dispatch(
                    deleteRequest({
                      reqId: request._id,
                      teamId: activeTeam._id,
                    })
                  )
                }
              >
                <Text style={styles.noButtonText}>AVBÖJ</Text>
              </Button>
            </View>
          </View>
        ))}
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#DEDEDE",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    color: "#070707",
    fontSize: 14,
    fontFamily: "Kodchasan_700Bold",
  },
  date: {
    color: "#070707",
    fontSize: 12,
    fontFamily: "Kodchasan_300Light",
  },
  message: {
    color: "#070707",
    fontSize: 12,
    fontFamily: "Kodchasan_400Regular",
  },
  messageHead: {
    color: "#070707",
    fontSize: 12,
    fontFamily: "Kodchasan_700Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  yesButton: {
    backgroundColor: "#6AC795",
  },
  noButton: {
    backgroundColor: "#D4436B",
  },
  yesButtonText: {
    fontFamily: "Kodchasan_400Regular",
  },
  noButtonText: {
    fontFamily: "Kodchasan_400Regular",
  },
});
