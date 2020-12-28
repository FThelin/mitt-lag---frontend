import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

async function getJWT() {
  if (Platform.OS === "web") {
    return Promise.resolve(localStorage.getItem("token"));
  }
  return SecureStore.getItemAsync("jwt");
}

export async function getAuthHeader() {
  const jwt = await getJWT();
  if (!jwt) return null;
  return { Authorization: `Bearer ${jwt}` };
}
