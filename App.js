import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { GAME_NAME } from "./utils/constants";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="App"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={GAME_NAME} component={GameScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
