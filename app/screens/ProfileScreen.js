import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { colors } from "../config";

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
