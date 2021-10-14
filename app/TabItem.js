import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { DEFAULT_TABBAR_HEIGHT, DURATION, ICON_SIZE } from "./constants";
import Weave from "./Weave";

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
  renderActiveIcon,
  renderIcon,
  route,
  shoawLabel = true,
  tabWidth,
}) => {
  const color = focused ? activeTintColor : inactiveTintColor;

  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const isActive = useDerivedValue(() => {
    return activeIndex.value === index;
  });

  const activeTransition = useDerivedValue(() => {
    return withTiming(isActive.value, { duration: 450 });
  });

  const staticIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isActive.value, { duration: DURATION }),
        },
      ],
    };
  });

  return (
    <View style={[styles.container, { width: tabWidth, backgroundColor }]}>
      <Weave {...{ activeTintColor, activeTransition, isActive }} />
      <Pressable
        onPress={() => {
          onPress();
          activeIndex.value = index;
        }}
        style={styles.tab}
      >
        <Animated.View style={[styles.tab]}>
          <View style={StyleSheet.absoluteFill}>
            {renderIcon({
              route,
              size: ICON_SIZE,
              color: inactiveTintColor,
            })}
          </View>
          <Animated.View style={[styles.icon, staticIconStyle]}>
            {renderActiveIcon({
              route,
              size: ICON_SIZE,
              color: activeTintColor,
            })}
          </Animated.View>
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
    height: DEFAULT_TABBAR_HEIGHT,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  icon: {
    overflow: "hidden",
  },
  label: {
    fontSize: 10,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default TabItem;
