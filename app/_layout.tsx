import { Analytics } from "@vercel/analytics/react";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          // Keep a consistent background during transitions/loading.
          contentStyle: { backgroundColor: "#070A17" },
        }}
      />
      {Platform.OS === "web" && <Analytics />}
    </>
  );
}
