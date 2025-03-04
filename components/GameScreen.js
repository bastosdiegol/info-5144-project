import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Input from "../systems/Input";
import Physics from "../systems/Physics";
import entities from "../entities";
import parseBMPImage from "../utils/parseBMPImage";
import { Asset } from "expo-asset";

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GameEngine
      style={styles.gameContainer}
      systems={[Input, Physics]}
      entities={entities(pixelData)}
      onEvent={(e) => {
        if (e.type === "game-over") {
          navigation.navigate("App");
        }
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  gameContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
});
