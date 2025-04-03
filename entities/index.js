import Matter from "matter-js";
import { WINDOW_WIDTH, WINDOW_HEIGHT, BOUNDARY_SIZE } from "../utils/constants";
import Boundary from "../components/Boundary";

export default () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  engine.gravity.y = 0;

  let world = engine.world;

  return {
    physics: { engine, world },

    BoundaryTop: Boundary(
      world,
      "orange",
      { x: WINDOW_WIDTH * 0.5, y: WINDOW_HEIGHT - WINDOW_HEIGHT / 1.08 },
      { width: WINDOW_WIDTH, height: BOUNDARY_SIZE },
      { label: "BoundaryTop" }
    ),

    BoundaryBottom: Boundary(
      world,
      "orange",
      { x: WINDOW_WIDTH * 0.5, y: WINDOW_HEIGHT / 1.11 },
      { width: WINDOW_WIDTH, height: BOUNDARY_SIZE },
      { isStatic: true, label: "BoundaryBottom" }
    ),

    BoundaryLeft: Boundary(
      world,
      "orange",
      { x: 0, y: WINDOW_WIDTH },
      { width: BOUNDARY_SIZE, height: WINDOW_WIDTH * 2 },
      { isStatic: true, label: "BoundaryLeft" }
    ),

    BoundaryRight: Boundary(
      world,
      "orange",
      { x: WINDOW_WIDTH, y: WINDOW_WIDTH },
      { width: BOUNDARY_SIZE, height: WINDOW_WIDTH * 2 },
      { isStatic: true, label: "BoundaryRight" }
    ),
  };
};
