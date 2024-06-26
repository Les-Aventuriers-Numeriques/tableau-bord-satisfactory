(function () {
    'use strict'

    const config = {
        countdownTarget: new Date(2024, 6, 26, 17, 4, 0),
    }

    function initAlpineComponents() {
        Alpine.data('countdownComponent', function () {
            return {
                hours: '??',
                minutes: '??',
                seconds: '??',
                interval: null,
                init() {
                    this.refresh()

                    const self = this

                    this.interval = setInterval(function() {
                        self.refresh()
                    }, 1000)
                },
                refresh() {
                    const remaining = config.countdownTarget.getTime() - new Date().getTime()

                    if (remaining < 0) {
                        if (this.interval) {
                            clearInterval(this.interval)
                        }

                        this.hours = 0
                        this.minutes = 0
                        this.seconds = 0

                        return
                    }

                    const secondsRemaining = Math.floor(remaining / 1000)

                    this.hours = Math.floor(secondsRemaining / 3600)
                    this.minutes = Math.floor((secondsRemaining % 3600) / 60)
                    this.seconds = Math.floor(secondsRemaining % 60)
                }
            }
        })
    }

    document.addEventListener('alpine:init', function () {
        initAlpineComponents()
    })
})();