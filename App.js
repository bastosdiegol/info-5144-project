import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { GAME_NAME } from "./utils/constants";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";
import InputControls from "./components/InputControls";

const Stack = createStackNavigator();
const consoleFrame = require("./assets/backgrounds/gameboy-overlay.png");
console.log(consoleFrame);

export default function App() {
  const handlePressUp = () => console.log("Up Button Pressed");
  const handlePressDown = () => console.log("Down Button Pressed");
  const handlePressLeft = () => console.log("Left Button Pressed");
  const handlePressRight = () => console.log("Right Button Pressed");
  const handlePressA = () => console.log("A Button Pressed");
  const handlePressB = () => console.log("B Button Pressed");
  const handlePressStart = () => console.log("Start Button Pressed");
  const handlePressSelect = () => console.log("Select Button Pressed");

  return (
    <ImageBackground
      source={consoleFrame}
      style={styles.fullScreen}
      resizeMode="cover"
    >
      <View style={styles.gameContainer}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={GAME_NAME}
              component={GameScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </View>

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
