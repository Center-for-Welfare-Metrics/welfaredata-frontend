import { StyleTypes } from "./enum_types"


export interface IColorType {
    theme:any
    type: StyleTypes
}

export const GetColorType = ({theme,type}:IColorType) => {
    switch(type){
        case 'primary':
            return theme.colors.local_blue
        case 'success':
            return theme.colors.local_green
        case 'danger':
            return theme.colors.local_red
        case 'warning':
            return theme.colors.local_yellow
        case 'default':
            return theme.colors.local_deep_blue
        default:
            return theme.colors.local_white
    }
}