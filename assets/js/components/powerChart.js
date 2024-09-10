import baseComponent from './base'
import uPlot from 'uplot'

export default function () {
    return Object.assign(Object.create(baseComponent), {
        data: [
            [], // Timestamps
            [], // Conso
            [], // Prod
            [], // Capacité
            [], // Conso max
        ],
        uPlotInstance: null,
        uPlotOptions: {
            width: '1200',
            height: '500',
            series: [
                {
                    label: 'Consommation',
                    stroke: 'red',
                    width: 1
                },
                {
                    label: 'Production',
                    stroke: 'green',
                    width: 1
                },
                {
                    label: 'Capacité',
                    stroke: 'blue',
                    width: 1
                },
                {
                    label: 'Consommation max',
                    stroke: 'orange',
                    width: 1
                }
            ]
        },

        init() {
            this.uPlotInstance = new uPlot(this.uPlotOptions, this.data, this.$el)

            this.actuallyInit()
        },

        refresh(firstTime = false) {
            const self = this

            this.fetch('getPower').then(function (powerCircuits) {
                self.data[0].push(Date.now() / 1000)

                const attrs = ['PowerConsumed', 'PowerProduction', 'PowerCapacity', 'PowerMaxConsumed']

                attrs.forEach(function (attr, index) {
                    self.data[index + 1].push(
                        powerCircuits
                            .map(function (powerCircuit) {
                                return powerCircuit[attr]
                            })
                            .reduce(function (a, b) {
                                return a + b
                            })
                    )
                })

                self.uPlotInstance.setData(self.data)
            })

            return true
        }
    })
}