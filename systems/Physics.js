import Matter from "matter-js";
import { PLAYER_SPEED, PLAYER_JUMP_FORCE } from "../utils/constants";

/**
 * Physics system.
 * @param {Object} entities - Entities object.
 * @param {Object} touches - Touches object.
 * @param {Object} time - Time object.
 * @param {Function} dispatch - Dispatch function.
 * @returns {Object} Entities object.
 */
const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  let world = engine.world;

  engine.timing.timeScale = 1;
  engine.timing.substeps = 8;

  // Set Gravity
  engine.world.gravity.y = 2;
  // Set Friction
  engine.world.friction = 0.3;

  // Playable character
  let player = entities.player;

  // Stop tiny unwanted movement
  if (Math.abs(player.body.velocity.x) < 0.1) {
    Matter.Body.setVelocity(player.body, { x: 0, y: player.body.velocity.y });
  }
  if (Math.abs(player.body.velocity.y) < 0.1) {
    Matter.Body.setVelocity(player.body, { x: player.body.velocity.x, y: 0 });
  }

  let playerVelocity = player.body.velocity;
  if (playerVelocity.x > 0) {
    player.animOptions.animType = "walkRight";
  } else if (playerVelocity.x < 0) {
    player.animOptions.animType = "walkLeft";
  }

  // Check for collisions between player and other static entities
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    pairs.forEach((pair) => {
      if (pair.bodyA === player.body || pair.bodyB === player.body) {
        Matter.Body.setVelocity(player.body, { x: 0, y: 0 });
      }
    });
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
