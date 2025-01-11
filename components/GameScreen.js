import React, { PureComponent } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Finger } from "./Finger";
import { MoveFinger } from "./system";

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
        systems={[MoveFinger]}
        entities={{
          1: { position: [40, 200], renderer: <Finger /> },
          2: { position: [100, 200], renderer: <Finger /> },
          3: { position: [160, 200], renderer: <Finger /> },
          4: { position: [220, 200], renderer: <Finger /> },
          5: { position: [280, 200], renderer: <Finger /> },
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
