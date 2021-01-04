import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  // useDerivedValue,
  // withSpring,
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { calender, colors } from "../config";

const { ICON_SIZE } = calender;

const config = {
  duration: 350,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
};

const TabItem = ({
  activeTintColor: customActiveTintColor,
  inactiveTintColor: customInactiveTintColor,
  activeBackgroundColor = "transparent",
  inactiveBackgroundColor = "transparent",
  activeIndex,
  focused,
  label,
  labelStyle,
  index,
  indicatorPosition,
  onPress,
  onLongPress,
  position,
  renderIcon,
  route,
  shoawLabel = true,
  tabWidth,
}) => {
  const activeTintColor =
    customActiveTintColor === undefined ? colors.pink : customActiveTintColor;

  const inactiveTintColor =
    customInactiveTintColor === undefined
      ? colors.gray
      : customInactiveTintColor;

  const color = focused ? activeTintColor : inactiveTintColor;

  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const staticIconStyle = useAnimatedStyle(() => {
    const visibily = interpolate(
      indicatorPosition.value,
      [
        position - tabWidth / 2,
        position - tabWidth / 4,
        position + tabWidth / 4,
        position + tabWidth / 2,
      ],
      [1, 0.2, 0.2, 1],
      Extrapolate.CLAMP
    );
    const isActive = index === activeIndex.value;
    const offset = isActive ? 0 : 1;
    return {
      opacity: visibily,
      transform: [
        {
          scale: withDelay(isActive ? 250 : 0, withTiming(offset, config)),
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => {
        onPress();
        activeIndex.value = index;
      }}
      {...{ onLongPress }}
      style={[styles.container, { backgroundColor }]}
    >
      <View style={[styles.tab, { width: tabWidth }]}>
        <Animated.View style={[styles.tab, staticIconStyle]}>
          {renderIcon({
            route,
            size: ICON_SIZE,
            color: inactiveTintColor,
          })}
        </Animated.View>
      </View>

      {shoawLabel && (
        <Text numberOfLines={1} style={[styles.label, { color }, labelStyle]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 4,
  },
  label: {
    fontSize: 10,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default TabItem;
