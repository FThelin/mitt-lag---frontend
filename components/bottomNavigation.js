import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Homepage from "./homepage/homepage";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const TestRoute = () => <Text>Test</Text>;

const Navigation = (props) => {
  // const { colors } = props.theme;
  const [index, setIndex] = React.useState(0);
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
    manageteam: TestRoute,
    games: AlbumsRoute,
    scoreboard: RecentsRoute,
    leagues: MusicRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      color="brown"
      activeColor="#F1F1F1"
      inactiveColor="#CECECE"
      barStyle={{ backgroundColor: "#3A3354" }}
    />
  );
};

export default Navigation;
