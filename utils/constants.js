import { Dimensions } from "react-native";

/** Game Time in Seconds */
export const MAX_GAME_TIME = 60;
/** Game Board Backgroud Image */
export const GAME_BOARD_IMG = require("../assets/air-hockey-board2.png");
/** Puck Image */
export const PUCK_IMG = require("../assets/puck.png");
/** Blue Paddle Image */
export const PADDLE_BLUE_IMG = require("../assets/blue-air-hockey-paddle.jpeg");
/** RED Paddle Image */
export const PADDLE_RED_IMG = require("../assets/red-air-hockey-paddle.jpeg");
/** Phone Screen Width */
export const WINDOW_WIDTH = Dimensions.get("window").width;
/** Phone Screen Height */
export const WINDOW_HEIGHT = Dimensions.get("window").height;
/** Boundary Size */
export const BOUNDARY_SIZE = 20;
/** Paddle Size */
export const PADDLE_SIZE = 30;
/** Puck Size */
export const PUCK_SIZE = 20;
/** Puck and Paddle Max Velocity */
export const MAX_VELOCITY = 5;
/** Paddle Max Allowed Distance */
export const PADDLE_MAX_DISTANCE = 200;
/** Paddle Player One Initial Location */
export const PADDLE_ONE_START = { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT - 100 };
/** Paddle Player Two Initial Location */
export const PADDLE_TWO_START = { x: WINDOW_WIDTH / 2, y: 100 };
/** Puck Initial Location */
export const PUCK_CENTER_START = {
  x: WINDOW_WIDTH / 2,
  y: WINDOW_HEIGHT / 2.05,
};
