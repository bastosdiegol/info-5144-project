import Matter from "matter-js";
import React from "react";
import MapPixel from "../components/MapPixel";
import Box from "../components/Box";
import Pokemon from "../components/Pokemon";
import { PIXEL_SIZE, SPRITESHEETS } from "../utils/constants";

export default async (pixelData) => {
  let engine = Matter.Engine.create();
  let world = engine.world;

  /**
   * Create pixel entities from the pixel data.
   * Create a single entity for consecutive pixels with the same color on the same Y level.
   * @param {Array} pixelData - Array of pixel data.
   * @returns {Array} - Array of pixel entities.
   */
  function createPixelEntities(pixelData) {
    const pixelsEntities = [];

    // Sort the pixel data row-wise
    pixelData.sort((a, b) => a.y - b.y || a.x - b.x);

    let i = 0;
    while (i < pixelData.length) {
      const startPixel = pixelData[i];
      let widthAccumulator = 1; // Count pixels

      // Find how many consecutive pixels with the same color on the same Y level
      while (
        i + 1 < pixelData.length &&
        pixelData[i + 1].y === startPixel.y &&
        pixelData[i + 1].x === pixelData[i].x + 1 * PIXEL_SIZE && // Check direct neighbor
        pixelData[i + 1].color === startPixel.color
      ) {
        widthAccumulator++;
        i++;
      }

      // Calculate adjusted position for the merged block
      const adjustedX = startPixel.x + widthAccumulator / 2;
      const adjustedY = startPixel.y + PIXEL_SIZE / 2;

      const body = Matter.Bodies.rectangle(
        adjustedX + (widthAccumulator * PIXEL_SIZE) / 2,
        adjustedY + PIXEL_SIZE / 2,
        widthAccumulator * PIXEL_SIZE,
        PIXEL_SIZE,
        {
          isStatic: true,
        }
      );
      Matter.World.add(world, body);

      pixelsEntities.push({
        body,
        color: startPixel.color,
        pos: { x: adjustedX * PIXEL_SIZE, y: adjustedY },
        width: widthAccumulator * PIXEL_SIZE,
        height: PIXEL_SIZE,
        renderer: (
          <MapPixel
            key={pixelsEntities.length}
            body={body}
            color={startPixel.color}
            width={widthAccumulator * PIXEL_SIZE}
            height={PIXEL_SIZE}
          />
        ),
      });

      // Move to the next pixel
      i++;
    }

    return pixelsEntities;
  }

  // Create pixel entities from the pixel data bitmap
  const pixelsEntities = createPixelEntities(pixelData);

  // Return a well-formed object
  const entities = {
    physics: { engine, world },

    player: Pokemon(
      world,
      "yellow",
      { x: 30, y: 30 },
      { width: PIXEL_SIZE, height: PIXEL_SIZE },
      {
        label: "Player",
        isStatic: false,
        restitution: 0,
        frictionAir: 0,
        spriteSheet: SPRITESHEETS.pikachu,
      },
      { animType: "appear" }
    ),

    ...pixelsEntities.reduce((acc, entity, index) => {
      acc[`pixel-${index}`] = entity;
      return acc;
    }, {}),
  };

  return entities;
};
