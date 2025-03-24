import Matter, { Sleeping } from "matter-js";
import { PLAYER_SPEED, PLAYER_JUMP_FORCE } from "../utils/constants";

/**
 * Input system with camera effect using setVelocity.
 * @param {Object} entities - Entities object.
 * @param {Object} events - Events object.
 * @returns {Object} Updated entities.
 */
const Input = (entities, { events }) => {
  const { player } = entities;

  let velocityX = 0;
  let velocityY = 0;

  // Determine the player's movement based on input events
  events.forEach((event) => {
    switch (event.type) {
      case "special":
        player.animOptions.animType = "special";
        break;
      case "jump":
        if (player.body.velocity.y < 0.1 && player.body.velocity.y > -0.1) {
          velocityY = PLAYER_JUMP_FORCE;
        }
        break;
      case "left":
        velocityX = -PLAYER_SPEED;
        break;
      case "right":
        velocityX = PLAYER_SPEED;
        break;
      case "down":
        velocityY = PLAYER_SPEED;
        break;
      default:
        break;
    }
  });

  // Apply velocity to the player
  if (velocityX !== 0 || velocityY !== 0) {
    Matter.Body.setVelocity(player.body, {
      x: velocityX,
      y: velocityY,
    });
  }

  return entities;
};

export default Input;
