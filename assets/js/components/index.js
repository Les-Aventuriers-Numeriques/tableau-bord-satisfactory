import players from './players'
import powerChart from './powerChart'
import Alpine from 'alpinejs'

export default () => {
    document.addEventListener('alpine:init', () => {
        Alpine.data('players', players)
        Alpine.data('powerChart', powerChart)
    })
}