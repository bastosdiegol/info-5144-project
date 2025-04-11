import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import { GAME_BOARD_IMG } from "../utils/constants";
import { Audio } from 'expo-av';

/**
 * WelcomeScreen component
 * Displays the welcome message and instructions for the game.
 *
 * @component
 * @param {object} navigation - Navigation prop to navigate between screens.
 * @returns {JSX.Element} - The rendered component.
 */
export default function WelcomeScreen({ navigation }) {
  const [aiDifficulty, setAiDifficulty] = useState(3);
  const [soundObjects, setSoundObjects] = useState({
    background: null,
    start: null,
    button: null
  });

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });
  }, []);

useEffect(() => {
    const loadSounds = async () => {
      try {
        const { sound: background } = await Audio.Sound.createAsync(
          require('../assets/Sounds/background.mp3'),
          { isLooping: true, volume: 0.3 }
        );
        
        const { sound: start } = await Audio.Sound.createAsync(
          require('../assets/Sounds/Start.mp3')
        );

        const { sound: button } = await Audio.Sound.createAsync(
          require('../assets/Sounds/button.mp3'),
          { volume: 0.7}
        );

        setSoundObjects({
          background,
          start,
          button
        });

        await background.playAsync();
      } catch (error) {
        console.error("Sound loading error:", error);
      }
    };

    loadSounds();


  return () => {
    if (soundObjects.background) {
      soundObjects.background.unloadAsync();
    }
    if (soundObjects.start) {
      soundObjects.start.unloadAsync();
    }
    if (soundObjects.button) {
      soundObjects.button.unloadAsync();
    }
  };
}, []);

const handleGameSound = async () => {
  try {
    if (soundObjects.background) {
      await soundObjects.background.stopAsync();
    }
    if (soundObjects.start) {
      await soundObjects.start.replayAsync();
    }
    navigation.navigate("Game", { aiDifficulty });
  } catch (error) {
    console.log('Error handling sounds:', error);
    navigation.navigate("Game", { aiDifficulty });
  }
};

const playSound = async (sound) => {
  try {
    if (sound) {
      await sound.replayAsync();
    }
  } catch (error) {
    console.log('Error playing sound:', error);
  }
};

const incrementDifficulty = async () => {
    await playSound(soundObjects.button);
    // Prevent difficulty from going above 15.
    setAiDifficulty((prev) => Math.min(15, prev + 1));
  };

  const decrementDifficulty = async () => {
    await playSound(soundObjects.button);
    // Prevent difficulty from going below 1.
    setAiDifficulty((prev) => Math.max(1, prev - 1));
  };

  return (
    <ImageBackground source={GAME_BOARD_IMG} style={styles.imageBackground}>
      <View style={styles.info}>
        <Text style={styles.textBold}>Welcome to the Air Hockey Game!</Text>
        <Text>
          Use your finger to control the{" "}
          <Text style={styles.textBlue}>blue</Text> paddle.
        </Text>
        <Text>
          Try to score a goal in your{" "}
          <Text style={styles.textRed}>AI opponent</Text>'s net!
        </Text>
        <Text>
          Developed by:{" "}
          <Text style={styles.textBold}>
            Diego Bastos, Alicja Blonski, Katt McGuinness
          </Text>
        </Text>

        {/* Difficulty Controls */}
        <View style={styles.difficultyContainer}>
          <TouchableOpacity style={styles.button} onPress={decrementDifficulty}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.difficultyText}>
            AI Difficulty: {aiDifficulty}
          </Text>
          <TouchableOpacity style={styles.button} onPress={incrementDifficulty}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          style={styles.button}
          onPress={handleGameSound}
        >
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    width: "100%",
    height: "28%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  textBold: {
    fontWeight: "bold",
  },
  textBlue: {
    color: "#0000FF",
    fontWeight: "bold",
  },
  textRed: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#f8268c",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  difficultyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  difficultyText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
