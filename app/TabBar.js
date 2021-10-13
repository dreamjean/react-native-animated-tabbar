import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import colors from "./colors";
import { width } from "./constants";
import TabItem from "./TabItem";

const TabBar = ({ state, descriptors, navigation, ...rest }) => {
  const activeIndex = useSharedValue(0);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const {
    tabBarShowLabel,
    tabBarLabelStyle,
    tabBarStyle,
    tabBarActiveTintColor,
    tabBarInactiveTintColor,
    tabBarActiveBackgroundColor,
    tabBarInactiveBackgroundColor,
  } = focusedOptions;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const { routes } = state;

  const tabWidth = width / routes.length;

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.tabs, tabBarStyle]}>
        {routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const position = tabWidth * index + tabWidth / 2;
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

          return (
            <TabItem
              key={`bg-${index}`}
              activeTintColor={tabBarActiveTintColor}
              inactiveTintColor={tabBarInactiveTintColor}
              activeBackgroundColor={tabBarActiveBackgroundColor}
              inactiveBackgroundColor={tabBarInactiveBackgroundColor}
              labelStyle={tabBarLabelStyle}
              showLabel={tabBarShowLabel}
              {...{
                activeIndex,
                focused,
                index,
                label,
                onPress,
                position,
                route,
                tabWidth,
              }}
              renderActiveIcon={options.activeIcon}
              renderIcon={options.tabBarIcon}
              {...rest}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  tabs: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    // height: DEFAULT_TABBAR_HEIGHT,
    // height: ICON_SIZE + PADDING * 2,
  },
});

export default TabBar;
