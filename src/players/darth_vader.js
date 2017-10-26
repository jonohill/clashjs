import {
  randomMove,
  getDirection,
  isVisible,
  canKill,
  safeRandomMove,
  fastGetDirection,
  turn,
  getDistance
} from '../lib/utils.js'

const PLAYER_NAME = 'Darth Vader'

const PLAYER_STYLE = 1

const chooseMove = (playerState, enemiesStates, gameEnvironment) => {
  const shouldShootPlayer = canKill(playerState, enemiesStates) && playerState.ammo
  if (shouldShootPlayer) {
    return 'shoot'
  }

  const ammoExists = gameEnvironment.ammoPosition.length > 0
  if (ammoExists) {
    const directionToAmmo = fastGetDirection(playerState.position, gameEnvironment.ammoPosition[0])
    const facingAmmo = directionToAmmo === playerState.direction

    if (!facingAmmo) {
      return directionToAmmo
    }

    return 'move'
  }

  return safeRandomMove()
}

module.exports = {
  info: {
    name: PLAYER_NAME,
    style: PLAYER_STYLE,
  },
  ai: chooseMove

}
