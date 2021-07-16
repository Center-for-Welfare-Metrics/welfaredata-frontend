const getSvgParentByGivenChildren : any = (children:Element) => {
    let element_aux = children
    let limit = 0
    while(element_aux.tagName !== 'svg' && limit<=10){
        element_aux = element_aux.parentElement
        limit++        
    }
    return element_aux
}

const getSvgParentViewBox = (children) => {
    let svgParent = getSvgParentByGivenChildren(children)

    return svgParent.getBBox()
}


const getElementPercentageSizeRelativeToSvgParent = (element) => {
    let svgViewBox = getSvgParentViewBox(element)
    let elementViewBox = element.getBBox()

    let svg_area = svgViewBox.width * svgViewBox.height
    let element_area = elementViewBox.width * elementViewBox.height    
    

    let percentage_size : number = (element_area*100)/svg_area

    // console.log(percentage_size)

    return percentage_size    
}

const arbitraryZoomLevelByPercentageSize = (percentage_size:number) => {
    let value = 0

    let size_reference = 0.5    

    if((percentage_size < 40) && (percentage_size > size_reference)){
        value = 0.2
    }else if(percentage_size <= size_reference){
        value = 1.5
    }

    return value
}

const isVerticalOriented = ratio => ratio >= 1

const isHorizontalOriented = ratio => ratio < 1

export const getElementViewBox = (element,isInner=false) => {    
    try {
        let {x,y,width,height} = element.getBBox()

        let percentage_size = getElementPercentageSizeRelativeToSvgParent(element)        
        let screen_ratio = window.innerHeight/window.innerWidth

        let element_ratio = height/width    

        let ratio = (Math.abs(screen_ratio - element_ratio)*2)
        
        if(isHorizontalOriented(screen_ratio) && isVerticalOriented(element_ratio)){                 
            x -= (width*ratio)/2
            width += (width*ratio)        
        }else if(isVerticalOriented(screen_ratio) && isVerticalOriented(element_ratio)){
            x -= (width*ratio)/2
            width += (width*ratio)
        }

        let arbitrary_variable_to_regule_zoom_level = arbitraryZoomLevelByPercentageSize(percentage_size)    

        if(arbitrary_variable_to_regule_zoom_level > 0){
            x -= (width*arbitrary_variable_to_regule_zoom_level)/2
            width+= (width*arbitrary_variable_to_regule_zoom_level)
        }

        let viewBox = `${x} ${y} ${(width)} ${height}`

        return viewBox
    } catch (error) {
        console.log('Dear dev...' + error)
        return null        
    }    
}