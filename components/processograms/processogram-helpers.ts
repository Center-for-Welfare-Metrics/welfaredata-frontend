export const getElementViewBox = element => {
    let bbox = element.getBBox()
    let viewBox = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
    return viewBox
}