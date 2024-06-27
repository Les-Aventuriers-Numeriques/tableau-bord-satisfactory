(function () {
    'use strict'

    const config = {
        countdownTarget: new Date(2024, 5, 27, 14, 55),
    }

    function initAlpineComponents() {
        const baseComponent = {
            refreshInterval: 10,
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
               if (!this.sounds.hasOwnProperty(name) || this.sounds[name].readyState != HTMLMediaElement.HAVE_ENOUGH_DATA) {
                  return
               }

               this.sounds[name].play()
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
                refreshInterval: 5,
                soundsToLoad: ['motus-boule-noire'],

                refresh(firstTime = false) {
                    const self = this

                    fetch('/players.json', {cache: 'no-store'})
                        .then(function (response) {
                            return response.json()
                        }).then(function (incomingPlayers) {
                            self.players = incomingPlayers
                                .filter(function (incomingPlayer) {
                                    return !!incomingPlayer.PlayerName
                                })
                                .map(function (incomingPlayer) {
                                    const [r, g, b] = ['R', 'G', 'B'].map(function (attr) {
                                        return Math.floor(incomingPlayer.TagColor[attr] * 255)
                                    })

                                    return {
                                        name: incomingPlayer.PlayerName,
                                        location: {
                                            x: '50px', // TODO
                                            y: '50px' // TODO
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