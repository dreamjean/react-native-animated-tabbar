import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { DURATION } from "./constants";

const size = 6;
const particules = [0, 0];
const config = { duration: DURATION / 2 };

const Particlues = ({
  bottomY,
  transition,
  topY,
  tabWidth,
  activeTintColor,
}) => {
  const x = useDerivedValue(() => {
    return tabWidth * transition.value + (tabWidth - size) / 2;
  });

  const topS = useDerivedValue(() => {
    return topY.value ? withTiming(1.25, config) : 0.75;
  });

  const bottomS = useDerivedValue(() => {
    return bottomY.value ? withTiming(1.25, config) : 0.75;
  });

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.particules}>
        {particules.map((_, i) => {
          const subParticules = particules.slice(0, i);

          const style = useAnimatedStyle(() => {
            return {
              backgroundColor: activeTintColor,
              transform: [
                {
                  translateX: subParticules.reduce(
                    (acc) => withSpring(acc),
                    x.value
                  ),
                },
                {
                  translateY: subParticules.reduce(
                    (acc) => withSpring(acc),
                    topY.value
                  ),
                },
                {
                  scale: subParticules.reduce(
                    (acc) => withSpring(acc),
                    topS.value
                  ),
                },
              ],
              opacity: topY.value ? 1 : 0,
            };
          });

          return <Animated.View key={i} style={[styles.particule, style]} />;
        })}
        {particules.map((_, i) => {
          const subParticules = particules.slice(0, i);

          const style = useAnimatedStyle(() => {
            return {
              backgroundColor: activeTintColor,
              transform: [
                {
                  translateX: subParticules.reduce(
                    (acc) => withSpring(acc),
                    x.value
                  ),
                },
                {
                  translateY: subParticules.reduce(
                    (acc) => withSpring(acc),
                    bottomY.value
                  ),
                },
                {
                  scale: subParticules.reduce(
                    (acc) => withSpring(acc),
                    bottomS.value
                  ),
                },
              ],
              opacity: bottomY.value ? 1 : 0,
            };
          });

          return <Animated.View key={i} style={[styles.particule, style]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  particules: {
    justifyContent: "center",
  },

  particule: {
    position: "absolute",
    left: 0,
    top: -10,
    width: size,
    height: size,
    borderRadius: size / 2,
  },
});

export default Particlues;
