import baseComponent from './base'

const constants = {
    centerExtra: 4, // Le milieu des marqueurs des joueurs (ils font 9x9 px)
    size: 400, // La carte fait 400x400 pixels
    onePixel: 1875, // Un pixel = 18,75 m
    origin: { // L'origine (le point 0,0), en pixels depuis en haut à droite
        x: 173,
        y: 200
    }
}

export default () => Object.assign(Object.create(baseComponent), {
    players: [],

    init() {
        this.actuallyInit()
    },

    refresh(firstTime = false) {
        const self = this

        this.fetch('getPlayer').then(incomingPlayers => {
            self.players = incomingPlayers
                .filter(incomingPlayer => !!incomingPlayer.PlayerName)
                .map(incomingPlayer => {
                    const [r, g, b] = ['R', 'G', 'B'].map(attr => Math.floor(incomingPlayer.TagColor[attr] * 255) ?? 255)

                    let top, left, bottom, right = null

                    if (incomingPlayer.location.x < 0) {
                        left = constants.origin.x - (Math.abs(incomingPlayer.location.x) / constants.onePixel) - constants.centerExtra
                    } else {
                        right = constants.size - constants.origin.x - (incomingPlayer.location.x / constants.onePixel) - constants.centerExtra
                    }

                    if (incomingPlayer.location.y < 0) {
                        top = constants.origin.y - (Math.abs(incomingPlayer.location.y) / constants.onePixel) - constants.centerExtra
                    } else {
                        bottom = constants.size - constants.origin.y - (incomingPlayer.location.y / constants.onePixel) - constants.centerExtra
                    }

                    return {
                        name: incomingPlayer.PlayerName,
                        location: {
                            top: top ? `${top}px` : null,
                            left: left ? `${left}px` : null,
                            bottom: bottom ? `${bottom}px` : null,
                            right: right ? `${right}px` : null
                        },
                        isDead: incomingPlayer.Dead,
                        color: `rgb(${r}, ${g}, ${b})`
                    }
                })
        })

        return true
    }
})