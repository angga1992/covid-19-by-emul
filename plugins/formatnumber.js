import Vue from 'vue'

Vue.filter('formatNumber', function (value, mode = 'normal', level = 2) {
    if (['string', 'number'].includes(typeof(value))) {
        var temp = value.toString()

        var result = ''

        if(mode === 'truncate') {
            var mod = temp.length % 3
            var segment = Math.floor(temp.length / 3) + (mod?0:-1)
            
            if(segment < level) {
                segment = 0
            }

            switch(segment) {
                case 1:
                    // result = (temp / 1000).toFixed(2).replace(/[.,]00?$/, "")
                    result = temp.substr(0, mod?mod:3)
                    // result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    // result += ' Ribu'
                    // result += ' Rb'
                    break;
                case 2:
                    // result = (temp / 1000000).toFixed(2).replace(/[.,]00?$/, "")
                    result = temp.substr(0, mod?mod:3)
                    // result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    // result += ' Juta'
                    // result += ' Jt'
                    break;
                case 3:
                    // result = (temp / 1000000000).toFixed(2).replace(/[.,]00$/, "")
                    result = temp.substr(0, mod?mod:3)
                    // result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    // result += ' Milyar'
                    // result += ' M'
                    break;
                case 4:
                    result = temp.substr(0, mod?mod:3)
                    // result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    // result += ' Triliun'
                    // result += ' T'
                    break;
                case 5:
                    result = temp.substr(0, (mod?mod:3)+3)
                    // result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                    // result += ' Triliun'
                    // result += ' T'
                    break;
                default: 
                    result = temp
                    result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }
        }  else if(mode === 'label') {
            var mod = temp.length % 3
            var segment = Math.floor(temp.length / 3) + (mod?0:-1)
            
            if(segment < level) {
                segment = 0
            }

            switch(segment) {
                case 1:
                    result += ' Rb'
                    break;
                case 2:
                    result += ' Jt'
                    break;
                case 3:
                    result += ' M'
                    break;
                case 4:
                    result += ' T'
                    break;
                case 5:
                    result += ' T'
                    break;
                default: 
                    result = ''
            }

            var residual = Number(temp.substr(mod?mod:3, temp.length))
            if(segment && residual > 0) {
                result += '++'
            }


        } else {
            result = temp
            result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }

        
        return result

        // temp = temp.substr(0, temp.length < fold * 3 ? temp.length : maxLength)
        // var result = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        // result += (value.toString().length < maxLength ? '' : suffix)
        // return result
    } else {
        return typeof(value)
    }
})


// 1 => 1
// 10 => 10
// 100 => 100
// 1.000 => 1.000 
// 10.000 => 10.000
// 100.000 => 100.000
// 1.000.000 => 1 JUTA ++
// 10.000.000 => 10 JUTA ++
// 100.000.000 => 100 JUTA ++
// 1.000.000.000 => 1 MILYAR ++
// 10.000.000.000 => 10 MILYAR ++
// 100.000.000.000 => 100 MILYAR ++
// 1.000.000.000.000 => 1 TRILIUN ++
// 10.000.000.000.000 => 10 TRILIUN ++
// 100.000.000.000.000 => 100 TRILIUN ++
// 1000.000.000.000.000 => 1000 TRILIUN ++
