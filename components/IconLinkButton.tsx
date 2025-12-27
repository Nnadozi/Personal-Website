import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useRef, useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import type { Theme } from "../constants/theme";
import { iconColors } from "../constants/theme";
import { openExternalUrl } from "../utils/linking";

interface IconLinkButtonProps {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  tooltip: string;
  href: string;
  theme: Theme;
}

const iconConfig: Record<string, { color: keyof typeof iconColors.light; bg: string; border: string; shadow: string }> = {
  "logo-github": {
    color: "github",
    bg: "rgba(24, 23, 23, ",
    border: "rgba(24, 23, 23, ",
    shadow: "rgba(24, 23, 23, ",
  },
  "logo-linkedin": {
    color: "linkedin",
    bg: "rgba(0, 119, 181, ",
    border: "rgba(0, 119, 181, ",
    shadow: "rgba(0, 119, 181, ",
  },
  "reader-outline": {
    color: "resume",
    bg: "rgba(59, 130, 246, ",
    border: "rgba(59, 130, 246, ",
    shadow: "rgba(59, 130, 246, ",
  },
  "mail-outline": {
    color: "email",
    bg: "rgba(234, 67, 53, ",
    border: "rgba(234, 67, 53, ",
    shadow: "rgba(234, 67, 53, ",
  },
};

const defaultConfig = {
  color: "resume" as const,
  bg: "rgba(59, 130, 246, ",
  border: "rgba(59, 130, 246, ",
  shadow: "rgba(59, 130, 246, ",
};

export function IconLinkButton({ icon, label, tooltip, href, theme }: IconLinkButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const config = iconConfig[icon] || defaultConfig;
  const showTooltip = icon === "reader-outline" || icon === "mail-outline";

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: Platform.OS !== "web",
      tension: 400,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: Platform.OS !== "web",
      tension: 400,
      friction: 8,
    }).start();
  };

  const getIconColor = () => iconColors[theme][config.color];

  const getBackgroundColor = (hovered: boolean) => {
    const alpha = hovered ? (theme === "light" ? 0.2 : 0.25) : theme === "light" ? 0.1 : 0.15;
    return `${config.bg}${alpha})`;
  };

  const getBorderColor = (hovered: boolean) => {
    const alpha = hovered ? (theme === "light" ? 0.5 : 0.6) : theme === "light" ? 0.3 : 0.4;
    return `${config.border}${alpha})`;
  };

  const getShadowColor = () => {
    const alpha = theme === "light" ? 0.35 : 0.4;
    return `${config.shadow}${alpha})`;
  };

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      onPress={() => openExternalUrl(href)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={({ hovered, pressed }) => [
        styles.iconBtn,
        {
          backgroundColor: getBackgroundColor(false),
          borderColor: getBorderColor(false),
        },
        hovered && {
          backgroundColor: getBackgroundColor(true),
          borderColor: getBorderColor(true),
          ...(Platform.OS === "web"
            ? ({
                boxShadow: `0 10px 30px ${getShadowColor()}, 0 0 0 1px ${getBorderColor(true)}`,
                transform: "translateY(-4px) scale(1.08)",
              } as unknown as object)
            : {}),
        },
        pressed && styles.iconBtnPressed,
      ]}
    >
      {({ hovered }) => (
        <Animated.View style={[styles.iconBtnInner, { transform: [{ scale: scaleAnim }] }]}>
          {Platform.OS === "web" && (hovered || isFocused) && showTooltip && (
            <View
              pointerEvents="none"
              style={[
                styles.tooltip,
                {
                  backgroundColor: theme === "light" ? "#000000" : "#1E293B",
                  borderColor: theme === "light" ? "#374151" : "#475569",
                },
              ]}
            >
              <Text style={[styles.tooltipText, { color: theme === "light" ? "#FFFFFF" : "#F8FAFC" }]}>
                {tooltip}
              </Text>
              <View
                style={[
                  styles.tooltipArrow,
                  {
                    backgroundColor: theme === "light" ? "#000000" : "#1E293B",
                    borderColor: theme === "light" ? "#374151" : "#475569",
                  },
                ]}
              />
            </View>
          )}
          <Ionicons name={icon} size={24} color={getIconColor()} />
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    ...(Platform.OS === "web"
      ? ({
          transitionProperty: "transform, background-color, border-color, box-shadow",
          transitionDuration: "250ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          userSelect: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        } as unknown as object)
      : {}),
  },
  iconBtnPressed: {
    transform: [{ scale: 0.94 }],
  },
  iconBtnInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: {
    position: "absolute",
    bottom: 58,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    zIndex: 50,
    ...(Platform.OS === "web"
      ? ({
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        } as unknown as object)
      : {}),
  },
  tooltipText: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  tooltipArrow: {
    position: "absolute",
    bottom: -5,
    left: "50%",
    width: 10,
    height: 10,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    transform: [{ translateX: -5 }, { rotate: "45deg" }],
  },
});

