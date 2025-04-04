import Matter from "matter-js";

/**
 * Input System
 * Handles touch events and updates the game entities.
 *
 * @param {object} entities - The game entities.
 * @param {object} touches - The touch events.
 * @param {object} time - The time object.
 * @param {function} dispatch - The dispatch function to send actions.
 * @return {object} - The updated entities.
 */
const Input = (entities, { touches, time, dispatch }) => {
  touches.forEach((touch) => {
    // Destructure touch event coordinates
    const { pageX, pageY } = touch.event;

    if (touch.type === "start") {
      // Check each entity to see if it's a paddle and if the touch is within its bounds.
      Object.keys(entities).forEach((key) => {
        let entity = entities[key];
        if (
          entity.body &&
          entity.body.label &&
          entity.body.label.includes("Paddle")
        ) {
          const { bounds, position } = entity.body;
          // Check if the touch falls within the paddle's bounds.
          if (
            pageX >= bounds.min.x &&
            pageX <= bounds.max.x &&
            pageY >= bounds.min.y &&
            pageY <= bounds.max.y
          ) {
            // Mark the paddle as selected and store the offset.
            entity.isSelected = true;
            entity.touchOffset = {
              x: position.x - pageX,
              y: position.y - pageY,
            };
          }
        }
      });
    } else if (touch.type === "move") {
      // For each selected paddle, move it with the touch while applying the offset.
      Object.keys(entities).forEach((key) => {
        let entity = entities[key];
        if (entity.isSelected) {
          const newX = pageX + entity.touchOffset.x;
          const newY = pageY + entity.touchOffset.y;
          Matter.Body.setPosition(entity.body, { x: newX, y: newY });
        }
      });
    } else if (touch.type === "end" || touch.type === "cancel") {
      // Clear the selection from all entities.
      Object.keys(entities).forEach((key) => {
        let entity = entities[key];
        if (entity.isSelected) {
          delete entity.isSelected;
          delete entity.touchOffset;
        }
      });
    }
  });

  return entities;
};

export default Input;
