import Matter from "matter-js";
import React from "react";
import MapPixel from "../components/MapPixel";
import Box from "../components/Box";
import { PIXEL_SIZE } from "../utils/constants";

export default async (pixelData) => {
  let engine = Matter.Engine.create();
  let world = engine.world;

  const pixelsEntities = pixelData.map((pixel, index) => {
    const adjustedX = pixel.x + PIXEL_SIZE / 2;
    const adjustedY = pixel.y + PIXEL_SIZE / 2;

    const body = Matter.Bodies.rectangle(
      adjustedX,
      adjustedY,
      PIXEL_SIZE,
      PIXEL_SIZE,
      {
        isStatic: true,
      }
    );
    Matter.World.add(world, body);

    return {
      body,
      color: pixel.color,
      pos: { x: adjustedX, y: adjustedY },
      width: PIXEL_SIZE,
      height: PIXEL_SIZE,
      renderer: (
        <MapPixel
          key={index}
          body={body}
          color={pixel.color}
          width={PIXEL_SIZE}
          height={PIXEL_SIZE}
        />
      ),
    };
  });

  // Return a well-formed object
  const entities = {
    physics: { engine, world },

    player: Box(
      world,
      "red",
      { x: 30, y: 30 },
      { width: PIXEL_SIZE * 2, height: PIXEL_SIZE * 2 },
      "Player",
      false
    ),

    ...pixelsEntities.reduce((acc, entity, index) => {
      acc[`pixel-${index}`] = entity;
      return acc;
    }, {}),
  };

  return entities;
};
