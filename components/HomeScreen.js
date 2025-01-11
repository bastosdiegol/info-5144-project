import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GAME_NAME } from "../utils/constants";

/**
 * Home screen component.
 * @param {Object} navigation - Navigation object.
 * @returns {JSX.Element} Home screen component.
 * @component HomeScreen
 */
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>Mobile Development 2</Text>
        <Text style={styles.subtitle}>Final Project App</Text>
      </View>
      <Text style={styles.title}>{GAME_NAME}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(GAME_NAME)}
      >
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.description}>Game developed by:</Text>
        <Text style={styles.description}>Alicja Blonski</Text>
        <Text style={styles.description}>Diego Bastos</Text>
        <Text style={styles.description}>Katt McGuinness</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f8268c",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
