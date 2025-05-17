import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import "../global.css";
import { toastConfig } from "@/components/CustomToast";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Toast config={toastConfig} />
    </>
  );
}
