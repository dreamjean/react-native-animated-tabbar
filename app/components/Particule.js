import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

// import { mix, useSpring, useTiming } from "react-native-redash";
import { calender, colors } from "../config";

const { PARTICULE_SIZE, PADDING } = calender;
// const height = PARTICULE_SIZE + PADDING * 2;

const topParticules = [{ yOffset: -26 }, { yOffset: -28 }, { yOffset: -30 }];
// const bottomPariticules = [0, 1];

// const springConfig = (velocity) => {
//   return {
//     stiffness: 1000,
//     damping: 500,
//     mass: 3,
//     overshootClamping: true,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//     velocity,
//   };
// };

const Particule = ({ activeIndex }) => {
  // const middle = height / 2 - PARTICULE_SIZE / 2;

  const position = useDerivedValue(() =>
    withSpring(activeIndex.value + PARTICULE_SIZE + PARTICULE_SIZE / 2)
  );

  // const yOffset = useDerivedValue(() => {
  //   withSpring(-28);
  // });

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {topParticules.map((particule, index) => {
          const stylec = useAnimatedStyle(() => {
            const isActive = index === activeIndex.value;

            return {
              transform: [
                {
                  translateX: position.value,
                },
                {
                  translateY: isActive ? 0 : withSpring(particule.yOffset),
                },
              ],
            };
          });

          return (
            <Animated.View
              key={`pc-${index}`}
              style={[styles.particule, stylec]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.yellow,
    left: -PADDING,
  },
  particule: {
    // position: "absolute",
    // top: 0,
    // left: -PADDING,
    width: PARTICULE_SIZE,
    height: PARTICULE_SIZE,
    borderRadius: PARTICULE_SIZE / 2,
    backgroundColor: colors.primary,
  },
  box: {
    height: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});

export default Particule;
