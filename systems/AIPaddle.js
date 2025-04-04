import Matter from "matter-js";
import { WINDOW_WIDTH, WINDOW_HEIGHT, MAX_VELOCITY } from "../utils/constants";

/**
 * AI System for PaddlePlayerTwo
 * This system updates the PaddlePlayerTwo's position to track the ball's vertical position.
 *
 * @param {object} entities - The game entities.
 * @param {object} time - The time object.
 * @return {object} - The updated entities.
 */
const AIPaddle = (entities, { time, aiDifficulty }) => {
  const paddle = entities.PaddlePlayerTwo;
  const puck = entities.Puck;

  // AI game boundaries
  const gameTop = 0;
  const gameBottom = WINDOW_HEIGHT * 0.4;

  const AI_MAX_VELOCITY = aiDifficulty;

  if (paddle && paddle.body && puck && puck.body) {
    const paddlePos = paddle.body.position;
    const puckPos = puck.body.position;

    // Normalize the puck's position to the paddle's coordinate system
    const diffY = puckPos.y - paddlePos.y;
    const diffX = puckPos.x - paddlePos.x;

    const speedFactor = 0.1;

    // Calculate the movement step and clamp it to prevent excessive speed
    let moveY = diffY * speedFactor;
    let moveX = diffX * speedFactor;
    moveY = Math.max(-AI_MAX_VELOCITY, Math.min(AI_MAX_VELOCITY, moveY));
    moveX = Math.max(-AI_MAX_VELOCITY, Math.min(AI_MAX_VELOCITY, moveX));

    // Compute the new position
    let newY = paddlePos.y + moveY;
    let newX = paddlePos.x + moveX;

    // Clamp newPos within the game boundaries
    const paddleHalfHeight = paddle.height ? paddle.height / 2 : 25;
    const paddleHalfWidth = paddle.width ? paddle.width / 2 : 25;
    newY = Math.max(
      gameTop + paddleHalfHeight,
      Math.min(newY, gameBottom - paddleHalfHeight)
    );
    newX = Math.max(
      paddleHalfWidth,
      Math.min(newX, WINDOW_WIDTH - paddleHalfWidth)
    );

    // Update the paddle's position
    Matter.Body.setPosition(paddle.body, { x: newX, y: newY });
  }

  return entities;
};

export default AIPaddle;
