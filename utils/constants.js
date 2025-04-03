import { Dimensions } from "react-native";

/** Game Time in Seconds */
export const MAX_GAME_TIME = 10;
/** Game Board Backgroud Image */
export const GAME_BOARD_IMG = require("../assets/air-hockey-board2.png");
/** Puck Image */
export const PUCK_IMG = require("../assets/puck.png");
/** Phone Screen Width */
export const WINDOW_WIDTH = Dimensions.get("window").width;
/** Phone Screen Height */
export const WINDOW_HEIGHT = Dimensions.get("window").height;
/** Boundary Size */
export const BOUNDARY_SIZE = 20;
/** Puck and Paddle Max Velocity */
export const MAX_VELOCITY = 5;
