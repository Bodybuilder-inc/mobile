import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
