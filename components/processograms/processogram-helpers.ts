export const getElementViewBox = element => {
    let {x,y,width,height} = element.getBBox()
    if(height >= width){ 
        let ratio = height/width       
        x -= (width*ratio)/2
        width += (width*ratio)
        console.log(ratio)
    }
    let viewBox = `${x} ${y} ${(width)} ${height}`    
    return viewBox
}