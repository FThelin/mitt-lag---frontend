import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";

// import Login from "./components/login/login"
import BottomNavigation from "./components/bottomNavigation";

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
  return (
    <PaperProvider theme={theme}>
      <StoreProvider store={store}>
        {/* <Login /> */}
        <BottomNavigation />
      </StoreProvider>
    </PaperProvider>
  );
}
