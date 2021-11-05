import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { DEFAULT_TABBAR_HEIGHT, DURATION, ICON_SIZE } from "./constants";
import Weave from "./Weave";

const config1 = { duration: DURATION };
const config2 = { duration: DURATION / 2 };

const TabItem = ({
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor = "transparent",
  inactiveBackgroundColor = "transparent",
  activeIndex,
  bottomY,
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
  topY,
}) => {
  const color = focused ? activeTintColor : inactiveTintColor;

  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const isActive = useDerivedValue(() => {
    return activeIndex.value === index;
  });

  const activeTransition = useDerivedValue(() => {
    return withTiming(isActive.value, config1);
  });

  const staticIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(isActive.value ? 1.2 : 0, config1) }],
    };
  });

  return (
    <View style={[styles.container, { width: tabWidth, backgroundColor }]}>
      <Weave {...{ activeTintColor, activeTransition, isActive }} />
      <Pressable
        onPress={() => {
          onPress();

          topY.value = withSequence(
            withTiming(-20, config2),
            withTiming(0, config2)
          );

          bottomY.value = withSequence(
            withTiming(30, config2),
            withTiming(0, config2)
          );

          activeIndex.value = index;
        }}
        style={styles.tab}
      >
        <View style={styles.tab}>
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
        </View>

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
    marginTop: 4,
    marginBottom: 3,
  },
});

export default TabItem;
