import { Image } from "react-native";
import Matter from "matter-js";
import {
  PADDLE_BLUE_IMG,
  PADDLE_RED_IMG,
  PADDLE_MAX_DISTANCE,
} from "../utils/constants";

/**
 * Paddle Component
 * Renders a paddle circle in the game.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @return {JSX.Element} - The rendered component.
 */
const Paddle = (props) => {
  const width = props.radius * 2;

  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - width / 2;

  return (
    <Image
      style={{
        width: width,
        height: width,
        left: x,
        top: y,
        position: "absolute",
        borderRadius: props.radius,
      }}
      resizeMode="stretch"
      source={props.color === "blue" ? PADDLE_BLUE_IMG : PADDLE_RED_IMG}
    />
  );
};

export default (world, color, pos, radius, extraOptions, running) => {
  const theCircle = Matter.Bodies.circle(pos.x, pos.y, radius, {
    label: extraOptions.label,

    frictionAir: 0,
    angularVelocity: 0,
    restitution: extraOptions.restitution,
    mass: 1000,
    inertia: Infinity,
    friction: 0,
    frictionStatic: 0,
    isStatic: false,
  });
  Matter.World.add(world, theCircle);

  return {
    body: theCircle,
    color,
    radius,
    extraOptions,
    running,
    renderer: <Paddle />,
  };
};
1;
