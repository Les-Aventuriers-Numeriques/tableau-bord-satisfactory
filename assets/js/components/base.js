export default {
    refreshInterval: 3,
    soundsToLoad: [],

    intervalId: null,
    sounds: {},

    actuallyInit() {
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
        const url = import.meta.env.DEV ? `/tests/${endpoint}.json` : `http://${import.meta.env.SATISFACTORY_HOST}:8081/${endpoint}`

        return fetch(url, {cache: 'no-store'}).then(function (response) {
            return response.json()
        })
    }
}