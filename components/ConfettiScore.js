import Matter from "matter-js";
import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import SpriteSheet from "rn-sprite-sheet";

const ConfettiScore = (props) => {
  const confettiRef = useRef(null);

  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  useEffect(() => {
    startAnimate(props.animOptions.animType);
  }, [props.animOptions.animType]);

  const startAnimate = (type) => {
    if (!confettiRef.current) return;

    if (type === "score") {
      // Play the score animation
      confettiRef.current.play({
        type: type,
        fps: 64,
        loop: false,
        onFinish: () => {
          props.animOptions.animType = "idle";
        },
      });
    } else {
      // Play the idle animation
      confettiRef.current.play({
        type: "idle",
        loop: true,
      });
    }
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: props.color,
        position: "absolute",
        left: xPos,
        top: yPos,
        width,
        height,
      }}
    >
      <SpriteSheet
        ref={confettiRef}
        source={require("../assets/spritesheets/confetti-anim.png")}
        columns={8}
        rows={8}
        height={height}
        imageStyle={{ marginTop: 0 }}
        animations={{
          score: Array.from({ length: 64 }, (_, i) => i),
          idle: [63],
        }}
      />
    </View>
  );
};

export default (
  world,
  color,
  pos,
  size,
  animOptions = { animType: "idle" }
) => {
  const theCandle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "ConfettiScore",
      isStatic: true,
      isSensor: true,
      friction: 0,
      restitution: 0,
      mass: 0,
    }
  );
  Matter.World.add(world, theCandle);
  return {
    body: theCandle,
    color,
    pos,
    animOptions,
    renderer: <ConfettiScore />,
  };
};
