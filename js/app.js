(function () {
    'use strict'

    const config = {
        testing: true, // Mode test activé ou non
        satisfactoryHost: 'PC-EPOC-MKII.local', // Hôte ou IP de l'ordinateur hébergeant la partie Satisfactory
        map: {
            centerExtra: 4, // Le milieu des marqueurs des joueurs (ils font 9x9 px)
            size: 400, // La carte fait 400x400 pixels
            onePixel: 1875, // Un pixel = 18,75 m
            origin: { // L'origine (le point 0,0), en pixels depuis en haut à droite
                x: 173,
                y: 200
            }
        }
    }

    function initAlpineComponents() {
        const baseComponent = {
            refreshInterval: 3,
            soundsToLoad: [],

            intervalId: null,
            sounds: {},

            init() {
                this.loadSounds()

                if (this.refresh(true)) {
                    const self = this

                    this.intervalId = setInterval(function() {
                        if (!self.refresh()) {
                            clearInterval(self.intervalId)
                        }
                    }, this.refreshInterval * 1000)
                }
            },

            loadSounds() {
                const self = this

                this.soundsToLoad.forEach(function (name) {
                    self.sounds[name] = new Audio(`/audio/${name}.mp3`)
                })
            },

            playSound(name) {
               if (!this.sounds.hasOwnProperty(name) || this.sounds[name].readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA) {
                  return
               }

               this.sounds[name].play()
            },

            fetch(endpoint) {
                const url = config.testing ? `/tests/${endpoint}.json` : `http://${config.satisfactoryHost}:8081/${endpoint}`

                return fetch(url, {cache: 'no-store'}).then(function (response) {
                    return response.json()
                })
            }
        }

        Alpine.data('playersComponent', function () {
            return Object.assign(Object.create(baseComponent), {
                players: [],
                soundsToLoad: ['motus-boule-noire'],

                refresh(firstTime = false) {
                    const self = this

                    this.fetch('getPlayer').then(function (incomingPlayers) {
                        self.players = incomingPlayers
                            .filter(function (incomingPlayer) {
                                return !!incomingPlayer.PlayerName
                            })
                            .map(function (incomingPlayer) {
                                const [r, g, b] = ['R', 'G', 'B'].map(function (attr) {
                                    return Math.floor(incomingPlayer.TagColor[attr] * 255) ?? 255
                                })

                                let top, left, bottom, right = null

                                if (incomingPlayer.location.x < 0) {
                                    left = config.map.origin.x - (Math.abs(incomingPlayer.location.x) / config.map.onePixel) - config.map.centerExtra
                                } else {
                                    right = config.map.size - config.map.origin.x - (incomingPlayer.location.x / config.map.onePixel) - config.map.centerExtra
                                }

                                if (incomingPlayer.location.y < 0) {
                                    top = config.map.origin.y - (Math.abs(incomingPlayer.location.y) / config.map.onePixel) - config.map.centerExtra
                                } else {
                                    bottom = config.map.size - config.map.origin.y - (incomingPlayer.location.y / config.map.onePixel) - config.map.centerExtra
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

                        // self.playSound('motus-boule-noire') quand un joueur meurt
                    })

                    return true
                }
            })
        })
    }

    document.addEventListener('alpine:init', function () {
        initAlpineComponents()
    })
})();