import React from "react";
import { useSelector } from "react-redux";
//import Login from "./login/login";
import Header from "./header/header";
import BottomNavigation from "./bottomNavigation";

export default function Landingpage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // return isLoggedIn ? (
  //   <>
  //     <Header />
  //     <BottomNavigation />
  //   </>
  // ) : (
  //   <Login />
  // );
  return (
    <>
      <Header />
      <BottomNavigation />
    </>
  );
}
