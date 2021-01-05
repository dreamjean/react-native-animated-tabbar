import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { calender } from "../config";
import Weave from "./Weave";

const { ICON_SIZE } = calender;

const config = {
  duration: 450,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
};

const TabItem = ({
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor = "transparent",
  inactiveBackgroundColor = "transparent",
  activeIndex,
  focused,
  label,
  labelStyle,
  index,
  onPress,
  onLongPress,
  renderIcon,
  route,
  shoawLabel = true,
  tabWidth,
}) => {
  const color = focused ? activeTintColor : inactiveTintColor;

  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const staticIconStyle = useAnimatedStyle(() => {
    const isActive = index === activeIndex.value;
    const offset = isActive ? 0 : 1;
    return {
      transform: [
        {
          scale: withDelay(isActive ? 250 : 0, withTiming(offset, config)),
        },
      ],
    };
  });

  return (
    <View style={[styles.container, { width: tabWidth, backgroundColor }]}>
      <Weave {...{ activeIndex, index, activeTintColor }} />
      <Pressable
        onPress={() => {
          onPress();
          activeIndex.value = index;
        }}
        {...{ onLongPress }}
        style={styles.container}
      >
        <Animated.View style={[styles.tab, staticIconStyle]}>
          {renderIcon({
            route,
            size: ICON_SIZE,
            color: inactiveTintColor,
          })}
        </Animated.View>

        {shoawLabel && (
          <Text numberOfLines={1} style={[styles.label, { color }, labelStyle]}>
            {label}
          </Text>
        )}
      </Pressable>
    </View>
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
