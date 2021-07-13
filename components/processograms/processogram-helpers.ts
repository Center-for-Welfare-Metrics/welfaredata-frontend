export const getElementViewBox = element => {
    let {x,y,width,height} = element.getBBox()
    if(height >= width){ 
        let ratio = (height/width)*1.2       
        x -= (width*ratio)/2
        width += (width*ratio)        
    }
    let viewBox = `${x} ${y} ${(width)} ${height}`    
    return viewBox
}