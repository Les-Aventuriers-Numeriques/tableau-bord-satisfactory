export default {
    refreshInterval: 3,

    intervalId: null,

    actuallyInit() {
        if (this.refresh(true)) {
            const self = this

            this.intervalId = setInterval(() => {
                if (!self.refresh()) {
                    clearInterval(self.intervalId)
                }
            }, this.refreshInterval * 1000)
        }
    },

    fetch(endpoint) {
        const url = import.meta.env.DEV ? `/tests/${endpoint}.json` : `http://${import.meta.env.SATISFACTORY_HOST}:8081/${endpoint}`

        return fetch(url, {cache: 'no-store'}).then(response => response.json())
    }
}