import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { calender } from "../config";

const config = {
  duration: 350,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
};

const { ICON_SIZE, PADDING } = calender;
const size = ICON_SIZE + PADDING;

const ActiveIcon = ({
  activeTintColor,
  activeIndex,
  index,
  renderActiveIcon,
}) => {
  const stylec = useAnimatedStyle(() => {
    const isActive = index === activeIndex.value;
    const yOffset = isActive ? 0 : -30;
    const offset = isActive ? 1 : 0;

    return {
      transform: [
        {
          translateY: withDelay(isActive ? 150 : 100, withSpring(yOffset)),
        },
        {
          scale: withDelay(isActive ? 250 : 0, withTiming(offset, config)),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: -PADDING - 3,
          with: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        },
        stylec,
      ]}
    >
      <View style={[styles.icon]}>
        {renderActiveIcon({
          size: ICON_SIZE,
          color: activeTintColor,
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActiveIcon;
