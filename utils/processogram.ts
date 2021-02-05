const getElementByLayerSufix = (node:any,sufix:string) => {
    let count = 0
    while(!(node.id.includes(sufix))){
        node = node.parentNode
        count++
        if(count>20 || node === document) {
            return null
        }
    }
    return node
}

const fixSufixName = (sufix:string) => {
    return sufix.replace('--','')
}

const getLayerName = (sufix:string,element:HTMLElement) => {
    let id = element.id
    let layer_name = id.replace(sufix,'')
    layer_name = layer_name.replace('_',' ')
    layer_name = layer_name.replace(/(-| )\d+/g,'')
    return layer_name
}

const getFixedSufixAndLayerName = (sufix:string,element:HTMLElement) => {
    let new_sufix = fixSufixName(sufix)
    let layer_name = getLayerName(sufix,element)

    return {
        layer_name:layer_name,
        sufix:new_sufix
    }
}


export {
    getElementByLayerSufix,
    getFixedSufixAndLayerName
}