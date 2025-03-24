import { Dimensions } from "react-native";

/**
 * @type {number}
 */
export const SCREEN_WIDTH = Dimensions.get("screen").width;

/**
 * @type {number}
 */
export const SCREEN_HEIGHT = Dimensions.get("screen").height;

/**
 * @type {string}
 */
export const GAME_NAME = "Game Name";

/**
 * Debug Mode.
 * @type {boolean}
 */
export const DEBUG = true;

/**
 * Pixel size.
 * @type {number}
 */
export const PIXEL_SIZE = 20;

/**
 * Player speed.
 * @type {number}
 */
export const PLAYER_SPEED = 3;

/**
 * Player jump force.
 * @type {number}
 */
export const PLAYER_JUMP_FORCE = -12;

/**
 * Sprite sheets.
 * @type {object}
 */
export const SPRITESHEETS = {
  ash: {
    sprite: require("../assets/spritesheets/ash_walk_anim.png"),
  },
  pikachu: {
    sprite: require("../assets/spritesheets/pikachu_anim.png"),
  },
};
