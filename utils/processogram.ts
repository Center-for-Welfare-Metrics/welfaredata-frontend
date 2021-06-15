import voca from 'voca'





export const getElementSizeInformations = (element:SVGElement) => {
    let rect = element.getBoundingClientRect()

    return rect
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