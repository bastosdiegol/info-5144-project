import Matter from "matter-js";

/**
 * Input System
 * Handles touch events and updates the game entities.
 * Processes input for both PaddlePlayerOne and PaddlePlayerTwo.
 *
 * @param {object} entities - The game entities.
 * @param {object} touches - The touch events.
 * @return {object} - The updated entities.
 */
export default InputMultiplayer = (entities, { touches }) => {
  if (!entities.touchevents) entities.touchevents = []
  const oldtouchevents = entities.touchevents
  const players = [entities.PaddlePlayerOne, entities.PaddlePlayerTwo]
  // Multitouch is broken in expo v52, so I have to do weird stuff to get multitouch for multiplayer to work
  touches.forEach(({ event }) => {
    let newtouchevents = []
    event.touches.forEach(({ identifier, pageX = null, pageY = null }) => {
      if (!oldtouchevents[identifier] || oldtouchevents[identifier].type === 'stale') {
        newtouchevents[identifier] = {
          pageX,
          pageY,
          type: 'start'
        }
      } else {
        newtouchevents[identifier] = {
          pageX,
          pageY,
          type: 'move'
        }
      }
    })
    // if a touch was released, it will no longer be in the `event.touches` array.
    // I check for any touches that do not exist in the new array and add an event for 'end'
    for (let [identifier, touchdata] of oldtouchevents.entries()) {
      if (touchdata && touchdata.type!=='stale' && !newtouchevents[identifier]) {
        newtouchevents[identifier] = {
          pageX: touchdata.pageX,
          pageY: touchdata.pageY,
          type: 'end'
        }
      }
    }
    
    // newtouchevents.forEach(({type}, v) =>console.log(v,type))

    for (let [identifier, touchdata] of newtouchevents.entries()) {
      if (!touchdata) continue
      const { pageX, pageY, type } = touchdata
      for (let player of players) {
        if (type === 'start' && player.body && !player.touchID && withinTouchBounds(player, pageX, pageY)) {
          player.touchID = identifier
          player.touchOffset = {
            x: player.body.position.x - pageX,
            y: player.body.position.y - pageY,
          }
        } else if (type === 'move' && player.body && player.touchID === identifier) {
          // const newX = pageX + player.touchOffset.x;
          // const newY = pageY + player.touchOffset.y;

          let newX = pageX + player.touchOffset.x;
          let newY = pageY + player.touchOffset.y;
          
          const centerY = entities.CenterBoundary.body.position.y;
       
          const bufferPlayerOne = -40;
          const bufferPlayerTwo = -15;
          
          if (player === entities.PaddlePlayerTwo && newY > centerY + bufferPlayerTwo) {
            newY = centerY + bufferPlayerTwo;
          } else if (player === entities.PaddlePlayerOne && newY < centerY - bufferPlayerOne) {
            newY = centerY - bufferPlayerOne;
          }


          Matter.Body.setPosition(player.body, { x: newX, y: newY });
        } else if (type === 'end' && player.touchID === identifier) {
          player.touchID = null
        }
      }
    }

    entities.touchevents = newtouchevents.map(touchdata => ({ ...touchdata, type: touchdata.type === 'end' ? 'stale' : touchdata.type }))
  })

  return entities;
};

function withinTouchBounds(paddle, pageX, pageY) {
  const { bounds, position } = paddle.body;
  // Check if the touch falls within the paddle's bounds
  if (
    pageX >= bounds.min.x &&
    pageX <= bounds.max.x &&
    pageY >= bounds.min.y &&
    pageY <= bounds.max.y
  ) {
    return true
  }
  return false
}