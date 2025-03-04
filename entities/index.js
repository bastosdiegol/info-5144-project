import Matter from "matter-js";

export default () => {
  let engine = Matter.Engine.create();
  let world = engine.world;

  return {
    physics: { engine, world },
  };
};
