import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { colors } from "../config";

function PlanetScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Activity Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    flexDirection: "row",
  },
});

export default PlanetScreen;
