import Matter from "matter-js";
import { PLAYER_SPEED } from "../utils/constants";

/**
 * Input system.
 * @param {Object} entities - Entities object.
 * @param {Object} touches - Touches object.
 * @returns {Object} Entities object.
 */
const Input = (entities, { touches }) => {
  // Apply Velocity on Player Entity Based on Screen Swipes
  touches
    .filter((t) => t.type === "move")
    .forEach((t) => {
      const { delta } = t;
      Matter.Body.setVelocity(entities.player.body, {
        x: delta.pageX * (PLAYER_SPEED / 5),
        y: delta.pageY * (PLAYER_SPEED / 5),
      });
    });

  return entities;
};

export default Input;
