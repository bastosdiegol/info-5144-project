import React, { PureComponent } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Input from "../systems/Input";
import Physics from "../systems/Physics";
import entities from "../entities";

/**
 * Game screen component.
 * @param {Object} navigation - Navigation object.
 * @returns {JSX.Element} Home screen component.
 * @component GameScreen
 */
export default class GameScreen extends PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <GameEngine
        style={styles.gameContainer}
        systems={[Input, Physics]}
        entities={entities()}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  gameContainer: {
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
  },
});
