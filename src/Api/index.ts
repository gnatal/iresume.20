import axios from "axios";
import { getItemAsync, setItemAsync } from "expo-secure-store";

export const Axios_API = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
console.log("Connecting to:", process.env.EXPO_PUBLIC_API_URL);

export const setToken = async (token: string, refreshToken: string) => {
  console.log(`Token: ${token} | RefreshToken: ${refreshToken}`);
  Axios_API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  await setItemAsync("token", token);
  await setItemAsync("refreshToken", refreshToken);
};

export const loadToken = async (): Promise<boolean> => {
  const token = await getItemAsync("token");

  if (token) {
    Axios_API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }
}