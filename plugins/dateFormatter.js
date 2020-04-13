import Vue from 'vue'

const HARI = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu'
]

const BULAN = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

Vue.filter('dateFormat', function (value, args1) {
    if (['number', 'string'].includes(typeof value)) {
        const date = new Date(value)
        const year = date.getFullYear()
        const month = BULAN[date.getMonth()]
        const dateInMonth = date.getDate()
        const day = HARI[date.getDay()]
        const hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours()
        const minute = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()
        if(args1 === 'noTime'){
            return `${dateInMonth} ${month} ${year}`
        } else {
            return `${dateInMonth} ${month} ${year} ${hour}:${minute}`
        }
    }
})

Vue.filter('dateFormat2', function (value) {
    if (['number', 'string'].includes(typeof value)) {
        const date = new Date(value)
        const year = date.getFullYear()
        const month = BULAN[date.getMonth()]
        const dateInMonth = date.getDate()
        const day = HARI[date.getDay()]
        const hour = date.getHours()
        const minute = date.getMinutes()
        // return `${day}, ${dateInMonth}-${month}-${year} ${hour}:${minute}`
        return `${dateInMonth<10?'0'+dateInMonth:dateInMonth}-${date.getMonth()<10?'0'+date.getMonth():date.getMonth()}-${year} ${hour<10?'0'+hour:hour}:${minute<10?'0'+minute:minute}`
    }
})