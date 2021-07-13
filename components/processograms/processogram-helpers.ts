export const getElementViewBox = (element,isInner=false) => {
    let {x,y,width,height} = element.getBBox()
    let screen_ratio = window.innerHeight/window.innerWidth
    let element_ratio = height/width    
    let ratio = (Math.abs(screen_ratio - element_ratio)*2)
    if(screen_ratio<1 && element_ratio >= 1){                 
        x -= (width*ratio)/2
        width += (width*ratio)        
    }

    if(isInner){
        x -= (width*0.2)/2

        width+= (width*0.2)
    }

    let viewBox = `${x} ${y} ${(width)} ${height}`    
    return viewBox
}