import React from "react";
import Header from "./header/header";
import BottomNavigation from "./bottomNavigation";

export default function HomeScreen({ navigation }) {
  return (
    <>
      <Header />
      <BottomNavigation />
    </>
  );
}
