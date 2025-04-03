import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import { GAME_BOARD_IMG } from "../utils/constants";

/**
 * WelcomeScreen component
 * Displays the welcome message and instructions for the game.
 *
 * @component
 * @param {object} navigation - Navigation prop to navigate between screens.
 * @returns {JSX.Element} - The rendered component.
 */
export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={GAME_BOARD_IMG} style={styles.imageBackground}>
      <View style={styles.info}>
        <Text>Welcome to the Air Hockey Game!</Text>
        <Text>Use your finger to control the paddle.</Text>
        <Text>Try to score a goal in your opponent's net!</Text>
        <Text>Good luck!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Game")}
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
