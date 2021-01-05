import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { calender, colors } from "../config";
import ActiveIcon from "./ActiveIcon";
import TabItem from "./TabItem";

const { width, DEFAULT_TABBAR_HEIGHT } = calender;

const TabBar = ({
  state,
  descriptors,
  navigation,
  activeBackgroundColor,
  activeTintColor: customActiveTintColor,
  inactiveBackgroundColor,
  inactiveTintColor: customInactiveTintColor,
  labelStyle,
  showLabel,
  tabStyle,
}) => {
  const activeIndex = useSharedValue(0);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const { routes } = state;

  const tabWidth = width / routes.length;

  const indicatorPosition = useDerivedValue(() => {
    return withTiming(activeIndex.value * tabWidth + tabWidth / 2, {
      duration: 500,
    });
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  });

  const activeTintColor =
    customActiveTintColor === undefined ? colors.pink : customActiveTintColor;

  const inactiveTintColor =
    customInactiveTintColor === undefined
      ? colors.gray
      : customInactiveTintColor;

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[{ position: "absolute", top: 0, left: 0 }, indicatorStyle]}
      >
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          return (
            <ActiveIcon
              key={`fg-${index}`}
              {...{ activeIndex, index, activeTintColor, tabWidth }}
              renderActiveIcon={options.activeIcon}
            />
          );
        })}
      </Animated.View>

      {routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const focused = index === state.index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabItem
            key={`bg-${index}`}
            {...{
              activeTintColor,
              inactiveTintColor,
              activeBackgroundColor,
              inactiveBackgroundColor,
              activeIndex,
              focused,
              index,
              indicatorPosition,
              label,
              labelStyle,
              onPress,
              onLongPress,
              route,
              showLabel,
              tabWidth,
            }}
            renderIcon={options.tabBarIcon}
            style={tabStyle}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    height: DEFAULT_TABBAR_HEIGHT,
  },
});

export default TabBar;
