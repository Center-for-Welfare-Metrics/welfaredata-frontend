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

const getFixedSufixAndLayerName = (sufix:string,element:any) => {

    let new_sufix = fixSufixName(sufix)
    let layer_name = getLayerName(sufix,element)

    return {
        layer_name:layer_name,
        fixed_sufix:new_sufix
    }
}

const encodeProcessogramTree = (processogram_tree:any) => {
    let str_tree = JSON.stringify(processogram_tree)

    return window.btoa(str_tree)
}

const decodeProcessogramTree = (encoded_tree:any) => {
    let str_tree = window.atob(encoded_tree)

    let processogram_tree = JSON.parse(str_tree)

    return processogram_tree
}

const historyToProcessogramTree = (history:any) => {
    let processogram_tree = {}

    Object.keys(history).forEach((level) => {
        processogram_tree[history[level].sufix] = history[level].id
    })

    return processogram_tree
}

const translateBySufix = {
    lf:'lifefates',
    ph:'phases',
    ci:'circumstances'
}

const generateInformationsToPushNewLayer = (svg_id:string) => {
    try {
        let [name,sufix] = svg_id.split('--')
        name = name.replace('_',' ')
        sufix = sufix.replace(/(-| )\d+/g,'')
        return {
            pushTo:translateBySufix[sufix],
            initialObject:{name}
        }
    } catch (error) {
        return null
    }
}

const fieldNameBySufix = {
    ps:'productionSystem',
    lf:'lifeFate',
    ph:'phase',
    ci:'circumstance'
}

const needSetInformations = (svg_id:string) => {
    let [name,sufix] = svg_id.split('--')
    name = name.replace('_',' ')
    sufix = sufix.replace(/(-| )\d+/g,'')
    return {
        collectionName:translateBySufix[sufix],
        field:fieldNameBySufix[sufix],
        name
    }
}

const showOnScreen = (field:string,document:any,field_reference:string) => {
    let show = ''
    show = document[field]
    if(document[field_reference]){
        show = document[field_reference][field]
    }
    return show
}

export {
    getElementByLayerSufix,
    getFixedSufixAndLayerName,
    historyToProcessogramTree,
    encodeProcessogramTree,
    decodeProcessogramTree,
    generateInformationsToPushNewLayer,
    showOnScreen,
    needSetInformations
}