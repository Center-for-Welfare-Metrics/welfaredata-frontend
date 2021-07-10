import voca from 'voca'
import lodash from 'lodash'

export interface ICoolFormat {
    levelName:'Circumstance'|'Phase'|'Life Fate'|'Production System'|string,
    elementName:string
    level:number
    domID:string
}

export const translateStackToCoolFormat  = (stack:string[]) => {
    let cool_json : ICoolFormat[] = []
    try {
        stack.forEach((id,index) => {
            cool_json.push({
                levelName:getLevelNameByGivingID(id),
                elementName:normalizeElementNameByGivingID(id),
                level:index,
                domID:id
            })        
        })

        return cool_json
    } catch (error) {
        console.log(error)
        return []
    }    
}

export interface IContentInformation {
    createdAt?:Date
    description?:string
    medias?: any[]
    ref__id?: string
    ref_createdAt?: Date
    ref_description?: string
    ref_global_population?: string    
    ref_medias?: any[]
    ref_name?: string
    ref_name_synonyms?: string[]
    ref_specie?: string
    ref_updatedAt?: Date
    specie?: string
    updatedAt?: Date    
    _id?: string
}

export const getCollectionInformationsByCoolFormat = (stack:ICoolFormat[],collection:any[]) => {

    const find = (item:ICoolFormat,collection) => {
        if(!item) return null
        
        const findProductionSystem = (item:ICoolFormat,collection) => {
            let finded = lodash.find(collection,{
                productionSystem:{
                    name:voca.lowerCase(item.elementName)
                }
            })    
            return finded
        }
        
        const findLifeFate = (item:ICoolFormat,collection) => {
            let finded = lodash.find(collection.lifefates,{
                lifeFate:{
                    name:voca.lowerCase(item.elementName)
                }
            })    
            return finded
        }
        
        const findPhase = (item:ICoolFormat,collection) => {
            let finded = lodash.find(collection.phases,{
                phase:{
                    name:voca.lowerCase(item.elementName)
                }
            })    
            return finded
        }
        
        const findCircumstance = (item:ICoolFormat,collection) => {
            let finded = lodash.find(collection.circumstances,{
                circumstance:{
                    name:voca.lowerCase(item.elementName)
                }
            })    
            return finded
        }
        try {
            let levels = {
                0:findProductionSystem,
                1:findLifeFate,
                2:findPhase,
                3:findCircumstance
            }
        
            return levels[item.level](item,collection)
        } catch (error) {
            console.log(error)
            return null
        }
        
    }

    const transformToContent = (item,stack_length:number) => {
        if(!item) return null
        try {
            let keys = {
                1:'productionSystem',
                2:'lifeFate',
                3:'phase',
                4:'circumstance'
            }
        
            let childrenName = keys[stack_length]        
            let children_content = item[childrenName]
            let new_children_content = {}
            Object.keys(children_content).forEach((key) => {
                new_children_content[`ref_${key}`] = children_content[key]
            })        
        
            return {...item,...new_children_content,[childrenName]:undefined}
        } catch (error) {
            console.log(error)
            return null
        }
    }

    if(stack.length>0){
        let target = collection
        for(let index in stack){
            let item = stack[index]
            let finded = find(item,target)
            if(finded){
                target = finded
            }
        }
        return transformToContent(target,stack.length)
    }
    
    return null
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
    if(id){
        id = id.replace(/--lf|--ps|--ph|--ci|-\d+/g,'')

        id = id.replace(/_/g,' ')

        return voca.titleCase(id)
    }else{
        return null
    }
}


export const getElementSizeInformations = (element:Element) => {
    let rect = element.getBoundingClientRect()
    
    let middleX = rect.left + (rect.width/2)
    let middleY = rect.top + (rect.height/2)

    return {...rect.toJSON(),middleX,middleY}
}


export const getRightTargetID = ({element,level,current}) => { 
    try {
        let element_helper = element          
        while(!element_helper.id?.includes(level) && element_helper.id!==current){
            element_helper = element_helper.parentElement            
        }    
        if(element_helper.id === current){
            return null
        }

        return element_helper.id 
    } catch (error) {
        return null
    }     
}