import Matter from "matter-js";
import { MAX_VELOCITY } from "../utils/constants";

/**
 * Physics System
 * Handles the physics engine for the game.
 *
 * @component
 * @param {object} entities - The game entities.
 * @param {object} touches - The touch events.
 * @param {object} time - The time object.
 * @param {function} dispatch - The dispatch function to send actions.
 * @return {object} - The updated entities.
 */
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  // Apply Velocity to Puck on Swipe
  touches.forEach((t) => {
    if (t.type === "start") {
      entities.touchStart = { x: t.event.pageX, y: t.event.pageY };
    } else if (t.type === "move") {
      if (!entities.touchStart) return;

      let puck = entities.Puck?.body;
      if (!puck) {
        console.error("Puck or its body is missing!", entities.Puck);
        return;
      }

      let rawVelocity = {
        x: (t.event.pageX - entities.touchStart.x) * 0.1,
        y: (t.event.pageY - entities.touchStart.y) * 0.1,
      };

      Matter.Body.setVelocity(puck, rawVelocity);
    }
  });
  // Ensure velocity is clamped every frame
  let puck = entities.Puck?.body;
  if (puck) {
    let clampedVelocity = clampVelocity(puck.velocity, MAX_VELOCITY);
    Matter.Body.setVelocity(puck, clampedVelocity);
  }
  Matter.Engine.update(engine, time.delta);

  // Handle Collision Events With Puck and Boundaries
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    let objA = pairs[0].bodyA;
    let objB = pairs[0].bodyB;
    let objALabel = objA.label;
    let objBLabel = objB.label;

    if (objALabel === "Puck" && objBLabel === "BoundaryTop") {
      // Reflect the puck off the top boundary
      Matter.Body.setVelocity(objA, {
        x: objA.velocity.x,
        y: -objA.velocity.y,
      });
    }
    if (objALabel === "Puck" && objBLabel === "BoundaryBottom") {
      // Reflect the puck off the bottom boundary
      Matter.Body.setVelocity(objA, {
        x: objA.velocity.x,
        y: -objA.velocity.y,
      });
    }
    if (objALabel === "Puck" && objBLabel === "BoundaryLeft") {
      // Reflect the puck off the left boundary
      Matter.Body.setVelocity(objA, {
        x: -objA.velocity.x,
        y: objA.velocity.y,
      });
    }
    if (objALabel === "Puck" && objBLabel === "BoundaryRight") {
      // Reflect the puck off the right boundary
      Matter.Body.setVelocity(objA, {
        x: -objA.velocity.x,
        y: objA.velocity.y,
      });
    }
  });
  Matter.Engine.update(engine, time.delta);

  return entities;
};

/**
 * Utility function to clamp velocity within a specified range.
 *
 * @function
 * @param {object} velocity - The velocity object with x and y properties.
 * @param {number} max - The maximum velocity limit.
 */
const clampVelocity = (velocity, max) => ({
  x: Math.max(-max, Math.min(velocity.x, max)),
  y: Math.max(-max, Math.min(velocity.y, max)),
});

export default Physics;
