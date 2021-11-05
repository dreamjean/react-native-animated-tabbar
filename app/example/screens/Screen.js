import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import colors from "../../colors";

function Screen({ name }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.body}>{name} Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "flex-end",
    margin: 25,
    marginTop: 38,
  },
  body: {
    color: colors.grey,
    fontSize: 20,
    fontWeight: "500",
  },
  textBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Screen;
