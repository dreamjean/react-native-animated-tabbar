import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { mix, useTiming } from "react-native-redash";

import { calender } from "../config";

const { ICON_SIZE, PADDING } = calender;
const size = ICON_SIZE + PADDING * 2;

const Weave = ({ activeIndex, index, activeTintColor }) => {
  const activeTransition = useTiming(activeIndex.value === index, {
    duration: 300,
  });

  const stylez = useAnimatedStyle(() => {
    const isActive = index === activeIndex.value;
    const scale = mix(activeTransition.value, 0.4, 1.2);
    const borderWidth = mix(activeTransition.value, 5, 1);

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
