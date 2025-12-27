import { useEffect, useMemo, useRef } from "react";
import { Animated, Platform } from "react-native";

export function useAnimations() {
  const entrance = useRef(new Animated.Value(0)).current;
  const avatarAnim = useRef(new Animated.Value(0)).current;
  const nameAnim = useRef(new Animated.Value(0)).current;
  const aboutAnim = useRef(new Animated.Value(0)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.spring(avatarAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(entrance, {
          toValue: 1,
          duration: 800,
          useNativeDriver: Platform.OS !== "web",
        }),
      ]),
      Animated.spring(nameAnim, {
        toValue: 1,
        tension: 40,
        friction: 6,
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.spring(aboutAnim, {
        toValue: 1,
        tension: 35,
        friction: 7,
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.spring(buttonsAnim, {
        toValue: 1,
        tension: 30,
        friction: 5,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]);

    sequence.start();
  }, [entrance, avatarAnim, nameAnim, aboutAnim, buttonsAnim]);

  const contentAnim = useMemo(
    () => ({
      opacity: entrance,
      transform: [
        {
          translateY: entrance.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 0],
          }),
        },
        {
          scale: entrance.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 1.05, 1],
          }),
        },
        {
          rotate: entrance.interpolate({
            inputRange: [0, 1],
            outputRange: ["-5deg", "0deg"],
          }),
        },
      ],
    }),
    [entrance]
  );

  const avatarAnimStyle = useMemo(
    () => ({
      opacity: avatarAnim,
      transform: [
        {
          scale: avatarAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1.2, 1],
          }),
        },
        {
          rotate: avatarAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["-180deg", "0deg"],
          }),
        },
      ],
    }),
    [avatarAnim]
  );

  const nameAnimStyle = useMemo(
    () => ({
      opacity: nameAnim,
      transform: [
        {
          translateY: nameAnim.interpolate({
            inputRange: [0, 0.6, 1],
            outputRange: [30, -5, 0],
          }),
        },
        {
          scale: nameAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.5, 1.1, 1],
          }),
        },
      ],
    }),
    [nameAnim]
  );

  const aboutAnimStyle = useMemo(
    () => ({
      opacity: aboutAnim,
      transform: [
        {
          translateX: aboutAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
          }),
        },
        {
          scale: aboutAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
    }),
    [aboutAnim]
  );

  const buttonsAnimStyle = useMemo(
    () => ({
      opacity: buttonsAnim,
      transform: [
        {
          translateY: buttonsAnim.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [40, -8, 0],
          }),
        },
        {
          scale: buttonsAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1.15, 1],
          }),
        },
      ],
    }),
    [buttonsAnim]
  );

  return {
    contentAnim,
    avatarAnimStyle,
    nameAnimStyle,
    aboutAnimStyle,
    buttonsAnimStyle,
  };
}

