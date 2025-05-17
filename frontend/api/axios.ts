import axios from "axios";
import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

// const baseURL =
//   Platform.OS === "android"
//     ? "http://10.0.2.2:3000"
//     : "http://192.168.3.54:3000";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
