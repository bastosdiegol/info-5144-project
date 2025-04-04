import Matter from "matter-js";
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  BOUNDARY_SIZE,
  PADDLE_SIZE,
  PUCK_SIZE,
  PADDLE_ONE_START,
  PADDLE_TWO_START,
  PUCK_CENTER_START,
} from "../utils/constants";
import Boundary from "../components/Boundary";
import Puck from "../components/Puck";
import ConfettiScore from "../components/ConfettiScore";
import Paddle from "../components/Paddle";

export default () => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  engine.gravity.y = 0;

  let world = engine.world;

  const GOAL_WIDTH = WINDOW_WIDTH * 0.3;
  const HALF_GOAL = GOAL_WIDTH / 2;
  const BOUNDARY_Y_TOP = WINDOW_HEIGHT - WINDOW_HEIGHT / 1.08;
  const BOUNDARY_Y_BOTTOM = WINDOW_HEIGHT / 1.11;
  const NET_OFFSET = 50;

  return {
    physics: { engine, world },

    Puck: Puck(world, "blue", PUCK_CENTER_START, PUCK_SIZE, {
      restitution: 0.9,
      label: "Puck",
    }),

    PaddlePlayerOne: Paddle(world, "blue", PADDLE_ONE_START, PADDLE_SIZE, {
      restitution: 0.9,
      label: "PaddlePlayerOne",
    }),

    PaddlePlayerTwo: Paddle(world, "red", PADDLE_TWO_START, PADDLE_SIZE, {
      restitution: 0.9,
      label: "PaddlePlayerTwo",
    }),

    GoalNetTop: Boundary(
      world,
      "transparent",
      { x: WINDOW_WIDTH / 2, y: BOUNDARY_Y_TOP - NET_OFFSET },
      { width: GOAL_WIDTH, height: BOUNDARY_SIZE / 2 },
      { isStatic: true, label: "GoalNetTop" }
    ),

    GoalNetBottom: Boundary(
      world,
      "transparent",
      { x: WINDOW_WIDTH / 2, y: BOUNDARY_Y_BOTTOM + NET_OFFSET },
      { width: GOAL_WIDTH, height: BOUNDARY_SIZE / 2 },
      { isStatic: true, label: "GoalNetBottom" }
    ),

    ConfettiScorePlayerOne: ConfettiScore(
      world,
      "transparent",
      { x: WINDOW_WIDTH * 0.5, y: WINDOW_HEIGHT * 0.7 },
      { width: WINDOW_WIDTH, height: WINDOW_HEIGHT * 0.5 },
      { animType: "idle" }
    ),

    ConfettiScorePlayerTwo: ConfettiScore(
      world,
      "transparent",
      { x: WINDOW_WIDTH * 0.5, y: WINDOW_HEIGHT * 0.3 },
      { width: WINDOW_WIDTH, height: WINDOW_HEIGHT * 0.5 },
      { animType: "idle" }
    ),

    BoundaryTopLeft: Boundary(
      world,
      "orange",
      {
        x: WINDOW_WIDTH / 2 - (HALF_GOAL + (WINDOW_WIDTH - GOAL_WIDTH) / 4),
        y: BOUNDARY_Y_TOP,
      },
      { width: (WINDOW_WIDTH - GOAL_WIDTH) / 2, height: BOUNDARY_SIZE },
      { isStatic: true, label: "BoundaryTopLeft" }
    ),

    BoundaryTopRight: Boundary(
      world,
      "orange",
      {
        x: WINDOW_WIDTH / 2 + (HALF_GOAL + (WINDOW_WIDTH - GOAL_WIDTH) / 4),
        y: BOUNDARY_Y_TOP,
      },
      { width: (WINDOW_WIDTH - GOAL_WIDTH) / 2, height: BOUNDARY_SIZE },
      { isStatic: true, label: "BoundaryTopRight" }
    ),

    BoundaryBottomLeft: Boundary(
      world,
      "orange",
      {
        x: WINDOW_WIDTH / 2 - (HALF_GOAL + (WINDOW_WIDTH - GOAL_WIDTH) / 4),
        y: BOUNDARY_Y_BOTTOM,
      },
      { width: (WINDOW_WIDTH - GOAL_WIDTH) / 2, height: BOUNDARY_SIZE },
      { isStatic: true, label: "BoundaryBottomLeft" }
    ),

    BoundaryBottomRight: Boundary(
      world,
      "orange",
      {
        x: WINDOW_WIDTH / 2 + (HALF_GOAL + (WINDOW_WIDTH - GOAL_WIDTH) / 4),
        y: BOUNDARY_Y_BOTTOM,
      },
      { width: (WINDOW_WIDTH - GOAL_WIDTH) / 2, height: BOUNDARY_SIZE },
      { isStatic: true, label: "BoundaryBottomRight" }
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
