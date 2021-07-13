export const getElementViewBox = (element) => {
    let {x,y,width,height} = element.getBBox()
    let screen_ratio = window.innerHeight/window.innerWidth
    let element_ratio = height/width
    console.log('screen',screen_ratio)
    console.log('element',element_ratio)
    let ratio = (Math.abs(screen_ratio - element_ratio)*2)
    if(screen_ratio<1 && element_ratio >= 1){                 
        x -= (width*ratio)/2
        width += (width*ratio)        
    }
    let viewBox = `${x} ${y} ${(width)} ${height}`    
    return viewBox
}