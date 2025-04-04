import Matter from "matter-js";
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  PADDLE_ONE_START,
  PADDLE_TWO_START,
} from "../utils/constants";

/**
 * GameResetSystem is a Matter.js system that resets the position of the puck and paddles
 * if they go out of bounds. It checks the position of each entity and resets them to their
 * initial positions if they are outside the screen boundaries.
 *
 * @component
 * @param {object} entities - The game entities.
 * @param {object} time - The time object.
 * @return {object} - The updated entities.
 */
const GameResetSystem = (entities, { time }) => {
  const puck = entities.Puck.body;
  const paddleOne = entities.PaddlePlayerOne.body;
  const paddleTwo = entities.PaddlePlayerTwo.body;

  // Reset paddles if out of bounds
  if (isOutsideScreen(paddleOne)) resetBody(paddleOne, PADDLE_ONE_START);
  if (isOutsideScreen(paddleTwo)) resetBody(paddleTwo, PADDLE_TWO_START);

  // Reset puck if out of bounds
  if (isOutsideScreen(puck)) {
    const distToP1 = Matter.Vector.magnitude(
      Matter.Vector.sub(puck.position, paddleOne.position)
    );
    const distToP2 = Matter.Vector.magnitude(
      Matter.Vector.sub(puck.position, paddleTwo.position)
    );

    const closestPaddleStart =
      distToP1 < distToP2 ? PADDLE_ONE_START : PADDLE_TWO_START;

    // Place puck slightly in front of the closest paddle
    const puckResetPos = {
      x: closestPaddleStart.x,
      y: closestPaddleStart.y + (distToP1 < distToP2 ? -50 : 50),
    };

    resetBody(puck, puckResetPos);
  }

  return entities;
};

/**
 * Utility function to check if a body is outside the screen.
 *
 * @function
 * @param {object} body - The body object to check.
 * @return {boolean} - True if the body is outside the screen, false otherwise.
 */
const isOutsideScreen = (body) => {
  let maxDistance = 10;
  return (
    body.position.x < -maxDistance ||
    body.position.x > WINDOW_WIDTH + maxDistance ||
    body.position.y < -maxDistance ||
    body.position.y > WINDOW_HEIGHT + maxDistance
  );
};

/**
 * Utility function to reset the position and velocity of a body.
 *
 * @function
 * @param {object} body - The body object to reset.
 * @param {object} position - The new position to set for the body.
 */
const resetBody = (body, position) => {
  Matter.Body.setPosition(body, position);
  Matter.Body.setVelocity(body, { x: 0, y: 0 });
  Matter.Body.setAngularVelocity(body, 0);
};

export default GameResetSystem;
