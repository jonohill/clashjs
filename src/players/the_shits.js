import {
    randomMove,
    getDirection,
    isVisible,
    canKill,
    safeRandomMove,
    fastGetDirection,
    turn,
    getDistance,
} from '../lib/utils.js'

const PLAYER_NAME = 'The Shits'

const PLAYER_STYLE = 5

const shouldGtfo = (playerState, enemiesStates) =>
    enemiesStates.some(enemy => {
        return (
            isVisible(enemy.position, playerState.position, enemy.direction) &&
            enemy.ammo > 0
        )
    })

const chooseMove = (playerState, enemiesStates, gameEnvironment) => {
    if (shouldGtfo(playerState, enemiesStates)) return safeRandomMove()

    const shouldShootPlayer =
        canKill(playerState, enemiesStates) && playerState.ammo
    if (shouldShootPlayer) {
        return 'shoot'
    }

    const ammoExists = gameEnvironment.ammoPosition.length > 0
    if (ammoExists) {
        const directionToAmmo = fastGetDirection(
            playerState.position,
            gameEnvironment.ammoPosition[0],
        )
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
    ai: chooseMove,
}
