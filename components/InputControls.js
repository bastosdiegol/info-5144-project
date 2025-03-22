import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const InputControls = ({
  onPressUp,
  onPressDown,
  onPressLeft,
  onPressRight,
  onPressA,
  onPressB,
  onPressStart,
  onPressSelect,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.buttonUp} onPress={onPressUp} />
      <TouchableOpacity style={styles.buttonDown} onPress={onPressDown} />
      <TouchableOpacity style={styles.buttonLeft} onPress={onPressLeft} />
      <TouchableOpacity style={styles.buttonRight} onPress={onPressRight} />
      <TouchableOpacity style={styles.buttonA} onPress={onPressA} />
      <TouchableOpacity style={styles.buttonB} onPress={onPressB} />
      <TouchableOpacity style={styles.buttonStart} onPress={onPressStart} />
      <TouchableOpacity style={styles.buttonSelect} onPress={onPressSelect} />
    </>
  );
};

const styles = StyleSheet.create({
  buttonUp: {
    position: "absolute",
    left: "7.5%",
    bottom: "60.5%",
    width: 43,
    height: 43,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonDown: {
    position: "absolute",
    left: "7.5%",
    bottom: "39%",
    width: 43,
    height: 43,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonLeft: {
    position: "absolute",
    left: "2.9%",
    bottom: "50%",
    width: 43,
    height: 43,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonRight: {
    position: "absolute",
    left: "12.1%",
    bottom: "50%",
    width: 43,
    height: 43,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonA: {
    position: "absolute",
    bottom: "51.5%",
    right: ".3%",
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonB: {
    position: "absolute",
    bottom: "43.6%",
    right: "10.4%",
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonStart: {
    position: "absolute",
    bottom: "14.9%",
    left: "15.5%",
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonSelect: {
    position: "absolute",
    bottom: "0%",
    left: "15.1%",
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default InputControls;
