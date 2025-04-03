import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import { MAX_GAME_TIME, GAME_BOARD_IMG } from "../utils/constants";
import { GameEngine } from "react-native-game-engine";
import Physics from "../systems/Physics";
import Input from "../systems/Input";
import entities from "../entities/index";

/**
 * GameScreen component
 * Displays the game screen with scores, timer, and game over message.
 *
 * @component
 * @param {object} navigation - Navigation prop to navigate between screens.
 * @returns {JSX.Element} - The rendered component.
 */
export default function GameScreen({ navigation }) {
  const [running, setRunning] = useState(true);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [gameTime, setGameTime] = useState(MAX_GAME_TIME);
  const [isGameOver, setIsGameOver] = useState(false);

  // Countdown Timer Effect
  useEffect(() => {
    if (gameTime > 0 && !isGameOver) {
      const timer = setInterval(() => {
        setGameTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (gameTime === 0) {
      setIsGameOver(true);
      setRunning(false);
    }
  }, [gameTime, isGameOver]);

  // Function to start a new game
  const startNewGame = () => {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setGameTime(MAX_GAME_TIME);
    setIsGameOver(false);

    setTimeout(() => {
      setRunning(true);
    }, 100);
  };

  const endGameMessage = () => {
    return (
      <View style={styles.info}>
        <Text style={styles.timerText}>Game Over!</Text>
        <Text />
        <Text style={styles.timerText}>
          Final Score - Team Red: {playerTwoScore} | Team Blue: {playerOneScore}
        </Text>
        <Text />
        <Text
          style={
            playerTwoScore > playerOneScore
              ? styles.teamTextRed
              : playerOneScore > playerTwoScore
              ? styles.teamTextBlue
              : styles.timerText
          }
        >
          {playerTwoScore > playerOneScore
            ? "Team Red Wins!"
            : playerTwoScore < playerOneScore
            ? "Team Blue Wins!"
            : "It's a Tie!"}
        </Text>
        <Text />
        <TouchableOpacity style={styles.button} onPress={startNewGame}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Info */}
      <View style={styles.topInfo}>
        {/* Team Red AI and Score on one line */}
        <View style={styles.teamInfo}>
          <Text style={styles.teamTextRed}>Team Red: Player Two</Text>
          <Text style={styles.scoreTextRed}>Score: {playerTwoScore}</Text>
        </View>

        {/* Timer on a separate line inside the same top info */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>Time Left: {gameTime}s</Text>
        </View>
      </View>

      {/* Background Image */}
      <ImageBackground source={GAME_BOARD_IMG} style={styles.imageBackground}>
        {/* Game Over Message */}
        {isGameOver && endGameMessage()}

        {/* Game Engine with Physics and Input Systems */}
        {!isGameOver && (
          <GameEngine
            systems={[Physics, Input]}
            entities={entities()}
            running={running}
            onEvent={(e) => {
              if (e.type === "GOAL_TEAM_ONE") {
                setPlayerOneScore(playerOneScore + 1);
              }
              if (e.type === "GOAL_TEAM_TWO") {
                setPlayerTwoScore(playerTwoScore + 1);
              }
            }}
          ></GameEngine>
        )}
      </ImageBackground>

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>
        <Text style={styles.teamTextBlue}>Team Blue: Player One</Text>
        <Text style={styles.scoreTextBlue}>Score: {playerOneScore}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
  },
  info: {
    position: "absolute",
    width: "100%",
    height: "28%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
    marginTop: 10,
    zIndex: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  topInfo: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "7.6%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    paddingHorizontal: 20,
  },
  teamInfo: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomInfo: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "7.5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  teamTextRed: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  scoreTextRed: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  teamTextBlue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  scoreTextBlue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  timerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
