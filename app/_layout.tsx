import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Keep a consistent background during transitions/loading.
        contentStyle: { backgroundColor: "#070A17" },
      }}
    />
  );
}
