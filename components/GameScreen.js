import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import Input from "../systems/Input";
import Physics from "../systems/Physics";
import entities from "../entities";
import parseBMPImage from "../utils/parseBMPImage";
import { Asset } from "expo-asset";
import InputControls, {
  handlePressA,
  handlePressB,
  handlePressStart,
  handlePressSelect,
  handlePressUp,
  handlePressDown,
  handlePressLeft,
  handlePressRight,
} from "./InputControls";

/**
 * Load the map by passing the BMP file path
 * @param {string} bmpPath - The path to the BMP file.
 */
const loadMap = async (bmpPath) => {
  try {
    const pixelsArray = await parseBMPImage(bmpPath);
    return pixelsArray;
  } catch (error) {
    console.error("Error loading map:", error);
    return [];
  }
};

export default function GameScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [pixelData, setPixelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const gameEngine = useRef(null);

  const consoleFrame = require("../assets/backgrounds/gameboy-overlay.png");

  useEffect(() => {
    // Load the first BMP asset
    const asset = Asset.fromModule(require("../assets/bitmap01.bmp"));
    asset.downloadAsync().then(() => {
      setImageUri(asset.localUri);
    });
  }, []);

  useEffect(() => {
    if (imageUri) {
      loadMap(imageUri).then((pixels) => {
        setPixelData(pixels);
        setLoading(false);
      });
    }
  }, [imageUri]);

  if (loading) {
    // Show a loading spinner while loading the assets
    return (
      <View style={styles.gameContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={consoleFrame}
      style={styles.fullScreen}
      resizeMode="cover"
    >
      <View style={styles.gameContainer}>
        <ImageBackground
          source={require("../assets/backgrounds/forest.jpg")}
          style={styles.fullScreen}
          resizeMode="cover"
        >
          <GameEngine
            ref={gameEngine}
            systems={[Input, Physics]}
            entities={entities(pixelData)}
            onEvent={(e) => {
              if (e.type === "game-over") {
                navigation.navigate("Home");
              }
            }}
            style={styles.fullScreen}
          ></GameEngine>
        </ImageBackground>
      </View>

      <InputControls
        onPressUp={() => handlePressUp(gameEngine)}
        onPressDown={() => handlePressDown(gameEngine)}
        onPressLeft={() => handlePressLeft(gameEngine)}
        onPressRight={() => handlePressRight(gameEngine)}
        onPressA={() => handlePressA(gameEngine)}
        onPressB={() => handlePressB(gameEngine)}
        onPressStart={() => handlePressStart(navigation)}
        onPressSelect={() => handlePressSelect(gameEngine)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  gameContainer: {
    position: "absolute",
    width: "50%",
    height: "80%",
    left: "25%",
    top: "10%",
  },
});
