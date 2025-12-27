import * as Linking from "expo-linking";
import { Platform } from "react-native";

export function openExternalUrl(url: string) {
  if (Platform.OS === "web") {
    globalThis?.open?.(url, "_blank", "noopener,noreferrer");
    return;
  }
  Linking.openURL(url);
}

