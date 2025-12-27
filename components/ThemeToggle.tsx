import { Ionicons } from "@expo/vector-icons";
import { Platform, Pressable } from "react-native";
import type { Theme } from "../constants/theme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        {
          position: "absolute",
          top: 30,
          right: 30,
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme === "light" ? "#000000" : "#FFFFFF",
          zIndex: 1000,
          ...(Platform.OS === "web"
            ? ({
                cursor: "pointer",
                transition: "transform 0.2s ease",
                transform: pressed ? "scale(0.95)" : "scale(1)",
              } as unknown as object)
            : {}),
        },
      ]}
    >
      <Ionicons
        name={theme === "light" ? "moon" : "sunny"}
        size={22}
        color={theme === "light" ? "#FFFFFF" : "#000000"}
      />
    </Pressable>
  );
}

