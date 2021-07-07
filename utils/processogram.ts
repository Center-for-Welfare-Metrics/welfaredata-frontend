import voca from 'voca'

export interface ICoolFormat {
    levelName:'Circumstance'|'Phase'|'Life Fate'|'Production System'|string,
    elementName:string
    level:number
    domID:string
}

export const translateStackToCoolFormat  = (stack:string[]) => {
    let cool_json : ICoolFormat[] = []
    stack.forEach((id,index) => {
        cool_json.push({
            levelName:getLevelNameByGivingID(id),
            elementName:normalizeElementNameByGivingID(id),
            level:index+1,
            domID:id
        })        
    })
    return cool_json
}

export const getCollectionInformationsByStack = (collection:any[],stack:string[]) => {
    
}



export const getLevelNameByGivingID = (id:string) => {
    let map_keys = {
        '--ps':'Production System',
        '--lf':'Life Fate',
        '--ph':'Phase',
        '--ci':'Circumstance'
    }

    let keys = Object.keys(map_keys)

    for(let index in keys){
        let key = keys[index]

        if(id.includes(key)){
            return map_keys[key]
        }
    }
    return null
}


export const normalizeElementNameByGivingID = (id:string) => {
    id = id.replace(/--lf|--ps|--ph|--ci|-\d+/g,'')

    id = id.replace(/_/g,' ')

    return voca.titleCase(id)
}


export const getElementSizeInformations = (element:Element) => {
    let rect = element.getBoundingClientRect()
    
    let middleX = rect.left + (rect.width/2)
    let middleY = rect.top + (rect.height/2)

    return {...rect.toJSON(),middleX,middleY}
}


export const getRightTargetID = ({element,level,current}) => {    
    let element_helper = element          
    while(element_helper && !element_helper.id?.includes(level) && element_helper.id!==current){
        element_helper = element_helper.parentElement
    }
    
    if(element_helper.id === current){
        return null
    }

    return element_helper.id  
}