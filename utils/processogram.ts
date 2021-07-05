import voca from 'voca'


export const getCollectionInformationsByStack = (collection:any[],stack:string[]) => {
    
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