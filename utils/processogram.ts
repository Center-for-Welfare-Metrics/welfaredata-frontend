import voca from 'voca'





export const getElementSizeInformations = (element:SVGElement) => {
    let rect = element.getBoundingClientRect()

    return rect
}