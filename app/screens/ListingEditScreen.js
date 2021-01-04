import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { colors } from "../config";

function ListingEditScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Listing Edit Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListingEditScreen;
