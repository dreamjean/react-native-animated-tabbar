import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import colors from "./colors";
import { width } from "./constants";
import Particlues from "./Particules";
import TabItem from "./TabItem";

const TabBar = ({ state, descriptors, navigation }) => {
  const activeIndex = useSharedValue(0);
  const topY = useSharedValue(0);
  const bottomY = useSharedValue(0);
  const transition = useDerivedValue(() => {
    return withTiming(activeIndex.value, { duration: 450 });
  });

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
              renderActiveIcon={options.activeIcon}
              renderIcon={options.tabBarIcon}
              {...{
                activeIndex,
                bottomY,
                focused,
                index,
                onPress,
                label,
                route,
                tabWidth,
                topY,
                transition,
              }}
            />
          );
        })}
        <Particlues
          {...{ transition, topY, bottomY, tabWidth }}
          activeTintColor={tabBarActiveTintColor}
        />
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
  },
});

export default TabBar;
