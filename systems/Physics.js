import Matter from "matter-js";

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
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default Physics;
