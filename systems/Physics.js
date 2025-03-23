import Matter from "matter-js";

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

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
