import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { GAME_NAME } from "./utils/constants";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.fullScreen}>
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
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
