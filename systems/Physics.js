import Matter from "matter-js";
import { MAX_VELOCITY, WINDOW_WIDTH, WINDOW_HEIGHT } from "../utils/constants";

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
  let puck = entities.Puck?.body;
  if (puck) {
    // Remove Air Friction from Puck
    Matter.Body.set(puck, { frictionAir: 0 });
    // Clamp the puck's velocity to a maximum value
    let clampedVelocity = clampVelocity(puck.velocity, MAX_VELOCITY);
    Matter.Body.setVelocity(puck, clampedVelocity);
  }

  const collisionStart = (event) => {
    // Check if there are any collision pairs
    if (!event.pairs || event.pairs.length === 0) return;
    let pairs = event.pairs;
    let objA = pairs[0].bodyA;
    let objB = pairs[0].bodyB;
    if (!objA || !objB) return;
    let objALabel = objA.label;
    let objBLabel = objB.label;
    let isGoal = false;

    // Cooldown for paddle hit detection
    let lastPaddleHitTime = 0;
    const PADDLE_HIT_COOLDOWN = 100;
    const currentTime = Date.now();

    // *** Handle Paddle & Puck Collision ***
    if (
      (objALabel.includes("Paddle") && objBLabel === "Puck") ||
      (objBLabel.includes("Paddle") && objALabel === "Puck")
    ) {
      if (currentTime - lastPaddleHitTime > PADDLE_HIT_COOLDOWN) {
        lastPaddleHitTime = currentTime;

        const paddle = objALabel.includes("Paddle") ? objA : objB;
        const puck = objALabel === "Puck" ? objA : objB;

        let normal = Matter.Vector.normalise({
          x: puck.position.x - paddle.position.x,
          y: puck.position.y - paddle.position.y,
        });

        const newPuckVelocity = Matter.Vector.mult(normal, MAX_VELOCITY * 2);

        Matter.Body.setVelocity(puck, newPuckVelocity);
      }
    }
    // Matter.Engine.update(engine, time.delta);

    // *** Handle Collision Events with Puck and Nets - Goal Detection **
    if (objALabel === "Puck" && objBLabel === "GoalNetTop") {
      dispatch({ type: "GOAL_TEAM_ONE" });
      // Reset the puck position close to player 2's goal
      Matter.Body.setPosition(objA, {
        x: WINDOW_WIDTH * 0.5,
        y: WINDOW_HEIGHT * 0.25,
      });
      isGoal = true;
      // Set the Score Animation
      entities.ConfettiScorePlayerOne.animOptions.animType = "score";
    }
    if (objALabel === "Puck" && objBLabel === "GoalNetBottom") {
      dispatch({ type: "GOAL_TEAM_TWO" });
      // Reset the puck position close to player 1's goal
      Matter.Body.setPosition(objA, {
        x: WINDOW_WIDTH * 0.5,
        y: WINDOW_HEIGHT * 0.75,
      });
      isGoal = true;
      // Set the Score Animation
      entities.ConfettiScorePlayerTwo.animOptions.animType = "score";
    }
    if (isGoal) {
      // Stop the puck and update the engine
      Matter.Body.setVelocity(objA, { x: 0, y: 0 });
      // Matter.Engine.update(engine, time.delta);
    }

    // *** Handle Collision Events With Puck and Boundaries ***
    if (
      objALabel === "Puck" &&
      (objBLabel === "BoundaryTopLeft" || objBLabel === "BoundaryTopRight")
    ) {
      // Reflect the puck off the top boundary
      Matter.Body.setVelocity(objA, {
        x: objA.velocity.x,
        y: -objA.velocity.y,
      });
    }
    if (
      objALabel === "Puck" &&
      (objBLabel === "BoundaryBottomLeft" ||
        objBLabel === "BoundaryBottomRight")
    ) {
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
  }

  Matter.Events.on(engine, "collisionStart", collisionStart);
  Matter.Engine.update(engine, time.delta);
  Matter.Events.off(engine, "collisionStart", collisionStart)

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
