import { Image } from "react-native";
import Matter from "matter-js";
import { PUCK_IMG } from "../utils/constants";

const Puck = (props) => {
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
      source={PUCK_IMG}
    />
  );
};

export default (world, color, pos, radius, extraOptions, running) => {
  const theCircle = Matter.Bodies.circle(pos.x, pos.y, radius, {
    label: extraOptions.label,

    frictionAir: 0,
    angularVelocity: 0,
    restitution: extraOptions.restitution,
    mass: 0.5,
    friction: 0,
    frictionStatic: 0,
    isStatic: false,
  });
  // Set random initial velocity after the puck is created
  Matter.Body.setVelocity(theCircle, {
    x: Math.random() * 5,
    y: Math.random() * 5,
  });
  Matter.World.add(world, theCircle);
  return {
    body: theCircle,
    color,
    radius,
    extraOptions,
    running,
    renderer: <Puck />,
  };
};
1;
