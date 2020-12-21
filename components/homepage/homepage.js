import React from "react";
import { Text, View } from "react-native";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import CircleIcon from "../buttons/circleIcon";
import { useSelector } from "react-redux";

export default function Homepage() {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  return (
    <>
      <DarkContainer>
        <Text
          style={{
            fontSize: 18,
            color: "#CECECE",
            fontFamily: "Kodchasan_500Medium",
          }}
        >
          {`Inloggad som ${loggedInUser.firstname} ${loggedInUser.lastname}`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#CECECE",
            fontFamily: "Kodchasan_500Medium",
          }}
        >
          (Lagledare / Hasses Sega gubbar)
        </Text>
      </DarkContainer>
      <LightContainer>
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
            <CircleIcon icon="account-group" buttonText="Hantera lag" />
            <CircleIcon icon="emoticon-angry" buttonText="Matcher" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <CircleIcon icon="format-list-numbered" buttonText="Poängliga" />
            <CircleIcon icon="medal" buttonText="Mina ligor" />
          </View>
        </View>
      </LightContainer>
    </>
  );
}
