import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { colors } from "../config";

function ListingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Listing Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListingScreen;
