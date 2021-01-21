import React from "react";
import { Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import CircleIcon from "../buttons/circleIcon";
import { useDispatch, useSelector } from "react-redux";
import { setNavigationIndex } from "../../features/navigaton/navigationSlice";

export default function Homepage() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const isLeader = useSelector((state) => state.auth.isLeader);
  const activeTeam = useSelector((state) => state.team.activeTeam);

  return (
    <>
      <DarkContainer
        text={`Inloggad som ${loggedInUser.firstname} ${loggedInUser.lastname}`}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#CECECE",
            fontFamily: "Kodchasan_500Medium",
          }}
        >
          {activeTeam
            ? `${activeTeam.name} / ${isLeader ? "Lagledare" : "Spelare"}`
            : "Du är inte medlem i något lag ännu."}
        </Text>
      </DarkContainer>
      <LightContainer extraStyle={{ justifyContent: "center", flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              height: 300,
              width: 300,
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <CircleIcon
                icon="account-group"
                buttonText="Hantera lag"
                click={() => dispatch(setNavigationIndex(1))}
              />
              <CircleIcon
                icon="emoticon-angry"
                buttonText="Matcher"
                click={() => dispatch(setNavigationIndex(2))}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <CircleIcon
                icon="format-list-numbered"
                buttonText="Poängliga"
                click={() => dispatch(setNavigationIndex(3))}
              />
              <CircleIcon
                icon="medal"
                buttonText="Mina ligor"
                click={() => dispatch(setNavigationIndex(4))}
              />
            </View>
          </View>
        </View>
      </LightContainer>
    </>
  );
}
