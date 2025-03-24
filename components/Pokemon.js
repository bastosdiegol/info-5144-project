import Matter from "matter-js";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import SpriteSheet from "rn-sprite-sheet";

const Pokemon = (props) => {
  const pokemonRef = useRef(null);
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  const initiateObj = () => {
    if (pokemonRef.current) {
      pokemonRef.current.play({
        type: "idle",
      });
    }
  };

  // Function to trigger animations dynamically
  const startAnimate = (type) => {
    if (!pokemonRef.current) return;

    if (props.animOptions.animType !== type) {
      props.animOptions.animType = type;
    }
    switch (type) {
      case "idle":
        pokemonRef.current.play({
          type: "idle",
          fps: 3,
          loop: true,
        });
        break;
      case "walkRight":
        pokemonRef.current.play({
          type: "walkRight",
          fps: 4,
          loop: true,
        });
        break;
      case "walkLeft":
        pokemonRef.current.play({
          type: "walkLeft",
          fps: 4,
          loop: true,
        });
        break;
      case "faintLeft":
        pokemonRef.current.play({
          type: "faintLeft",
          fps: 4,
          loop: false,
          onFinish: () => {
            props.animOpitons.visibility = "none";
          },
        });
        break;
      case "faintRight":
        pokemonRef.current.play({
          type: "faintRight",
          fps: 4,
          loop: false,
          onFinish: () => {
            props.animOptions.visibility = "none";
          },
        });
        break;
      case "special":
        pokemonRef.current.play({
          type: "special",
          fps: 13,
          loop: false,
          onFinish: () => {
            props.animOptions.animType = "idle";
          },
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    startAnimate(props.animOptions.animType);
  }, [props.animOptions.animType]);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "yellow",
        position: "absolute",
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        // backgroundColor: props.color,
        display: props.animOptions.visibility,
      }}
    >
      <SpriteSheet
        ref={pokemonRef}
        source={props.spriteSheet}
        columns={4}
        rows={8}
        height={height}
        onLoad={initiateObj}
        imageStyle={{ margin: 0 }}
        animations={{
          walkRight: Array.from({ length: 4 }, (_, i) => i),
          walkLeft: Array.from({ length: 4 }, (_, i) => i + 4),
          faintLeft: Array.from({ length: 4 }, (_, i) => i + 8),
          faintRight: Array.from({ length: 4 }, (_, i) => i + 12),
          special: Array.from({ length: 13 }, (_, i) => i + 16),
          idle: Array.from({ length: 3 }, (_, i) => i + 29),
        }}
      />
    </View>
  );
};

export default (world, color, pos, size, extraOptions, animOptions) => {
  const boundary = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: extraOptions.label,
      isStatic: extraOptions.isStatic,
      restitution: extraOptions.restitution,
      frictionAir: extraOptions.frictionAir,
    }
  );
  Matter.World.add(world, boundary);
  return {
    body: boundary,
    color,
    pos,
    animOptions,
    spriteSheet: extraOptions.spriteSheet.sprite,
    renderer: <Pokemon />,
  };
};
