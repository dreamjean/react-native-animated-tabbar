import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTiming } from "react-native-redash";

import { calender } from "../config";

const { ICON_SIZE, PADDING } = calender;
const size = ICON_SIZE + PADDING * 2;

const Weave = ({ activeIndex, index, activeTintColor }) => {
  const activeTransition = useTiming(activeIndex.value === index, {
    duration: 300,
  });

  const stylez = useAnimatedStyle(() => {
    const isActive = index === activeIndex.value;

    const scale = interpolate(
      activeTransition.value,
      [0, 0.25, 0.5, 0.75, 1],
      [0, 0.5, 0.75, 0.9, 1]
    );
    const borderWidth = interpolate(
      activeTransition.value,
      [0, 0.25, 0.5, 0.75, 1],
      [0.5, 2, 4, 2, 0.5]
    );

    const opacity = interpolate(activeTransition.value, [0, 0.5, 1], [0, 1, 0]);
    return {
      transform: [{ scale }],
      borderColor: isActive ? activeTintColor : "transparent",
      borderWidth,
      opacity,
    };
  });

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.weave, stylez]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  weave: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
});

export default Weave;
