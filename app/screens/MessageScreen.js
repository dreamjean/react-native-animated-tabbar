import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { colors } from "../config";

function MessageScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Message Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessageScreen;
