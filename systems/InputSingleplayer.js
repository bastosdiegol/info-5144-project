import Matter from "matter-js";

/**
 * Input System
 * Handles touch events and updates the game entities.
 * Only processes input for PaddlePlayerOne.
 *
 * @param {object} entities - The game entities.
 * @param {object} touches - The touch events.
 * @param {object} time - The time object.
 * @param {function} dispatch - The dispatch function to send actions.
 * @return {object} - The updated entities.
 */
export default InputSingleplayer = (entities, { touches, time, dispatch }) => {
  touches.forEach((touch) => {
    const { pageX, pageY, identifier } = touch.event;

    if (touch.type === "start") {
      const paddle = entities.PaddlePlayerOne;
      if (paddle && paddle.body && !paddle.isSelected) {
        const { bounds, position } = paddle.body;
        // Check if the touch falls within the paddle's bounds
        if (
          pageX >= bounds.min.x &&
          pageX <= bounds.max.x &&
          pageY >= bounds.min.y &&
          pageY <= bounds.max.y
        ) {
          // Mark the paddle as selected and store the touch offset and identifier
          paddle.isSelected = true;
          paddle.touchOffset = {
            x: position.x - pageX,
            y: position.y - pageY,
          };
          paddle.touchId = identifier;
        }
      }
    } else if (touch.type === "move") {
      const paddle = entities.PaddlePlayerOne;
      if (paddle && paddle.isSelected && paddle.touchId === identifier) {
        // const newX = pageX + paddle.touchOffset.x;
        // const newY = pageY + paddle.touchOffset.y;

        let newX = pageX + paddle.touchOffset.x;
        let newY = pageY + paddle.touchOffset.y;

        const centerY = entities.CenterBoundary.body.position.y;
        const bufferPlayerOne = -40;

        if (newY < centerY - bufferPlayerOne) {
          newY = centerY - bufferPlayerOne;
        }

        Matter.Body.setPosition(paddle.body, { x: newX, y: newY });
      }
    } else if (touch.type === "end" || touch.type === "cancel") {
      // Clear the selection
      const paddle = entities.PaddlePlayerOne;
      if (paddle && paddle.isSelected && paddle.touchId === identifier) {
        delete paddle.isSelected;
        delete paddle.touchOffset;
        delete paddle.touchId;
      }
    }
  });

  return entities;
};

