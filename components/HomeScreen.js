import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { GAME_NAME } from "../utils/constants";

/**
 * Home screen component.
 * @param {Object} navigation - Navigation object.
 * @returns {JSX.Element} Home screen component.
 * @component HomeScreen
 */
export default function HomeScreen({ navigation }) {
  const consoleFrame = require("../assets/backgrounds/gameboy-overlay.png");
  /**
   * Load the game screen.
   */
  const handleLoadGame = () => {
    console.log("Load Game");
    navigation.navigate(GAME_NAME);
  };

  return (
    <ImageBackground
      source={consoleFrame}
      style={styles.fullScreen}
      resizeMode="cover"
    >
      <View style={styles.gameContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Mobile Development 2</Text>
          <Text style={styles.subtitle}>Final Project App</Text>
          <Text style={styles.title}>{GAME_NAME}</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.buttonSave}
            onPress={() => navigation.navigate(GAME_NAME)}
          >
            <Text style={styles.buttonText}>New Game</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLoad} onPress={handleLoadGame}>
            <Text style={styles.buttonText}>Load Game</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>Game developed by:</Text>
          <Text style={styles.description}>Alicja Blonski</Text>
          <Text style={styles.description}>Diego Bastos</Text>
          <Text style={styles.description}>Katt McGuinness</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gameContainer: {
    position: "absolute",
    width: "50%",
    height: "80%",
    left: "25%",
    top: "10%",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
    marginVertical: 10,
  },
  buttonSave: {
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
  buttonLoad: {
    backgroundColor: "grey",
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
