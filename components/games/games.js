import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DarkContainer from "../darkContainer";
import LightContainer from "../lightContainer";
import { FAB, Portal, Provider, Button, Menu } from "react-native-paper";
import { getGames } from "../../features/game/gameSlice";

export default function Games() {
  const [seasons, setSeasons] = useState([]);
  const [defaultSeason, setDefaultSeason] = useState("");
  //Redux
  const isLeader = useSelector((state) => state.auth.isLeader);
  const activeTeam = useSelector((state) => state.team.activeTeam);
  const games = useSelector((state) => state.game.games);
  const updateGames = useSelector((state) => state.game.updateGames);
  const dispatch = useDispatch();

  //FAB
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  //Menu
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    fetchAllGames();
  }, [updateGames]);

  const fetchAllGames = async () => {
    const res = await dispatch(getGames(activeTeam._id));
    if (res) {
      await getSeasons(res.payload);
    }
  };

  const getSeasons = async (allGames) => {
    let seasonArr = [];
    for (const s of allGames) {
      seasonArr.push(s.season);
    }
    await setSeasons(seasonArr);
    setDefaultSeasonFunction(seasonArr);
  };

  const setDefaultSeasonFunction = (seasonArr) => {
    if (seasonArr.length != 0) {
      let currentSeason = 0;

      for (const season of seasonArr) {
        const year1 = parseInt(season.slice(0, 4));
        const year2 = parseInt(season.slice(5, 9));

        const sum = year1 + year2;

        if (sum > currentSeason) {
          currentSeason = sum;
          setDefaultSeason(season);
        }
      }
    }
  };
  return (
    <>
      <DarkContainer text="Matcher">
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}
        ></Menu>
      </DarkContainer>
      <LightContainer>
        {console.log(defaultSeason)}
        <View style={{ backgroundColor: "yellow", height: 200, width: 300 }}>
          {visible &&
            seasons.map((season, index) => (
              <View key={index}>
                <Text>{season}</Text>
              </View>
            ))}
        </View>
        {/* <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? "arrow-down" : "plus"}
              actions={
                isLeader
                  ? [
                      {
                        icon: "plus",
                        label: "Ny match",
                        onPress: () => console.log("Pressed add"),
                      },
                      {
                        icon: "pen",
                        label: "Redigera",
                        onPress: () => console.log("Pressed star"),
                      },
                      {
                        icon: "trash-can",
                        label: "Ta bort",
                        onPress: () => console.log("Pressed email"),
                      },
                      {
                        icon: "kabaddi",
                        label: "Spelarresultat",
                        onPress: () => console.log("Pressed notifications"),
                        small: false,
                      },
                    ]
                  : [
                      {
                        icon: "kabaddi",
                        label: "Spelarresultat",
                        onPress: () => console.log("Pressed notifications"),
                        small: false,
                      },
                    ]
              }
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider> */}
      </LightContainer>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
