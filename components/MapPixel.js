import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";

const MapPixel = ({ body, color, width, height }) => {
  const xPos = body.position.x - width / 2;
  const yPos = body.position.y - height / 2;

  const [texture, setTexture] = useState(null);

  useEffect(() => {
    switch (color) {
      case "rgb(0, 0, 0)":
        setTexture(require("../assets/cobblestone.png"));
        break;
      case "rgb(0, 255, 0)":
        setTexture(require("../assets/grass_block.png"));
        break;
      default:
        setTexture(null);
    }
  }, [color]);

  return (
    <View
      style={{
        position: "absolute",
        left: xPos,
        top: yPos,
        width: width,
        height: height,
        backgroundColor: color,
      }}
    >
      {texture && (
        <Image source={texture} style={{ width: width, height: height }} />
      )}
    </View>
  );
};

export default MapPixel;
