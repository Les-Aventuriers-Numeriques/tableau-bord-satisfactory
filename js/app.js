(function () {
    'use strict'

    const config = {
        testing: true,
        satisfactoryHost: 'PC-EPOC-MKII.local',
        countdownTarget: new Date(2024, 5, 28, 20, 0),
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
                    self.sounds[name] = new Audio(`/sounds/${name}.mp3`)
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

        Alpine.data('countdownComponent', function () {
            return Object.assign(Object.create(baseComponent), {
                hours: '??',
                minutes: '??',
                seconds: '??',
                refreshInterval: 1,
                soundsToLoad: ['bien-joue'],

                refresh(firstTime = false) {
                    const remaining = config.countdownTarget.getTime() - new Date().getTime()

                    if (remaining < 0) {
                        if (!firstTime) {
                            this.playSound('bien-joue') // TODO Changer le son en corne de brume
                        }

                        this.hours = 0
                        this.minutes = 0
                        this.seconds = 0

                        return false
                    }

                    const secondsRemaining = Math.floor(remaining / 1000)

                    this.hours = Math.floor(secondsRemaining / 3600)
                    this.minutes = Math.floor((secondsRemaining % 3600) / 60)
                    this.seconds = Math.floor(secondsRemaining % 60)

                    // this.playSound('') quand compte à rebours à 1 heure
                    // this.playSound('') quand compte à rebours à 30 minutes
                    // this.playSound('') quand compte à rebours à 15 minutes
                    // this.playSound('') quand compte à rebours à 1 minute
                    // this.playSound('') quand compte à rebours à 5 secondes
                    // this.playSound('') quand compte à rebours à 4 secondes
                    // this.playSound('') quand compte à rebours à 3 secondes
                    // this.playSound('') quand compte à rebours à 2 secondes
                    // this.playSound('') quand compte à rebours à 1 seconde

                    return true
                }
            })
        })

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

                                // -1 px pour la bordure, -2 px pour le milieu
                                const centerExtra = 3

                                // La carte fait 400x400 pixels
                                const mapSize = 400

                                // Un pixel = 18,75 m
                                const onePixel = 1875

                                // L'origine (le point 0,0)
                                const origin = {
                                    x: 173,
                                    y: 200
                                }

                                let top, left, bottom, right = null

                                if (incomingPlayer.location.x < 0) {
                                    left = origin.x - (Math.abs(incomingPlayer.location.x) / onePixel) - centerExtra
                                } else {
                                    right = mapSize - origin.x - (incomingPlayer.location.x / onePixel) - centerExtra
                                }

                                if (incomingPlayer.location.y < 0) {
                                    top = origin.y - (Math.abs(incomingPlayer.location.y) / onePixel) - centerExtra
                                } else {
                                    bottom = mapSize - origin.y - (incomingPlayer.location.y / onePixel) - centerExtra
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