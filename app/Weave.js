import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { DEFAULT_TABBAR_HEIGHT } from "./constants";

const Weave = ({ activeTintColor, activeTransition, isActive }) => {
  const stylez = useAnimatedStyle(() => {
    const scale = mix(activeTransition.value, 0.4, 1);
    const borderWidth = mix(activeTransition.value, 5, 1);

    const opacity = interpolate(activeTransition.value, [0, 0.5, 1], [0, 1, 0]);
    return {
      transform: [{ scale }],
      borderColor: isActive.value ? activeTintColor : "transparent",
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
    width: DEFAULT_TABBAR_HEIGHT,
    height: DEFAULT_TABBAR_HEIGHT,
    borderRadius: DEFAULT_TABBAR_HEIGHT / 2,
  },
});

export default Weave;
