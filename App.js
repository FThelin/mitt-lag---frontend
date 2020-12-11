import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import {
  useFonts,
  Kodchasan_200ExtraLight,
  Kodchasan_200ExtraLight_Italic,
  Kodchasan_300Light,
  Kodchasan_300Light_Italic,
  Kodchasan_400Regular,
  Kodchasan_400Regular_Italic,
  Kodchasan_500Medium,
  Kodchasan_500Medium_Italic,
  Kodchasan_600SemiBold,
  Kodchasan_600SemiBold_Italic,
  Kodchasan_700Bold,
  Kodchasan_700Bold_Italic,
} from "@expo-google-fonts/kodchasan";

import { AppLoading } from "expo";
import Landingpage from "./components/landingpage";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Kodchasan_200ExtraLight,
    Kodchasan_200ExtraLight_Italic,
    Kodchasan_300Light,
    Kodchasan_300Light_Italic,
    Kodchasan_400Regular,
    Kodchasan_400Regular_Italic,
    Kodchasan_500Medium,
    Kodchasan_500Medium_Italic,
    Kodchasan_600SemiBold,
    Kodchasan_600SemiBold_Italic,
    Kodchasan_700Bold,
    Kodchasan_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <PaperProvider theme={theme}>
        <StoreProvider store={store}>
          <Landingpage />
        </StoreProvider>
      </PaperProvider>
    );
  }
}
