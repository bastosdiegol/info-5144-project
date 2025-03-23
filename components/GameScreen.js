import React, { useEffect, useState } from "react";
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
import InputControls from "./InputControls";

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

  const consoleFrame = require("../assets/backgrounds/gameboy-overlay.png");

  const handlePressUp = () => console.log("Up Button Pressed");
  const handlePressDown = () => console.log("Down Button Pressed");
  const handlePressLeft = () => console.log("Left Button Pressed");
  const handlePressRight = () => console.log("Right Button Pressed");
  const handlePressA = () => console.log("A Button Pressed");
  const handlePressB = () => console.log("B Button Pressed");
  const handlePressStart = () => {
    navigation.navigate("Home");
  };
  const handlePressSelect = () => console.log("Select Button Pressed");

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
      <GameEngine
        style={styles.gameContainer}
        systems={[Input, Physics]}
        entities={entities(pixelData)}
        onEvent={(e) => {
          if (e.type === "game-over") {
            navigation.navigate("Home");
          }
        }}
      ></GameEngine>

      <InputControls
        onPressUp={handlePressUp}
        onPressDown={handlePressDown}
        onPressLeft={handlePressLeft}
        onPressRight={handlePressRight}
        onPressA={handlePressA}
        onPressB={handlePressB}
        onPressStart={handlePressStart}
        onPressSelect={handlePressSelect}
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
  },
  gameContainer: {
    position: "absolute",
    width: "50%",
    height: "80%",
    left: "25%",
    top: "10%",
  },
});
