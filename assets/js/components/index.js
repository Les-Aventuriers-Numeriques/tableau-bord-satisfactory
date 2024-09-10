import players from './players'
import powerChart from './powerChart'
import Alpine from 'alpinejs'

export default function () {
    document.addEventListener('alpine:init', function () {
        Alpine.data('players', players)
        Alpine.data('powerChart', powerChart)
    })
}