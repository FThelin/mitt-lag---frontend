import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Homepage from "./homepage/homepage";
import { useSelector, useDispatch } from "react-redux";
import { setNavigationIndex } from "../features/navigaton/navigationSlice";
import ManageTeamNavigation from "./manageteam/ManageTeamNavigation";
import RegisterTeam from "./manageteam/registerTeam";
import Scoreboard from "./scoreboard/scoreboard";
import GamesNavigation from "./games/gamesNavigation";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const navigationIndex = useSelector(
    (state) => state.navigation.navigationIndex
  );
  const [routes] = React.useState([
    {
      key: "homepage",
      title: "Hem",
      icon: "home",
    },
    {
      key: "manageteam",
      title: "Hantera lag",
      icon: "account-group",
    },
    {
      key: "games",
      title: "Matcher",
      icon: "emoticon-angry",
    },
    { key: "scoreboard", title: "Poängliga", icon: "format-list-numbered" },
    { key: "leagues", title: "Mina ligor", icon: "medal" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    homepage: Homepage,
    manageteam: ManageTeamNavigation,
    games: GamesNavigation,
    scoreboard: Scoreboard,
    leagues: RegisterTeam,
  });

  return (
    <BottomNavigation
      navigationState={{ index: navigationIndex, routes }}
      onIndexChange={(e) => dispatch(setNavigationIndex(e))}
      renderScene={renderScene}
      activeColor="#F1F1F1"
      inactiveColor="#CECECE"
      barStyle={{
        backgroundColor: "#3A3354",
      }}
    />
  );
};

export default Navigation;
