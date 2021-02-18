

export interface IColorType {
    theme:any
    type:'primary' | 'success' | 'warning' | 'danger'
}

export const ColorType = ({theme,type}:IColorType) => {
    switch(type){
        case 'primary':
            return theme.colors.local_blue
        case 'success':
            return theme.colors.local_green
        case 'danger':
            return theme.colors.local_red
        case 'warning':
            return theme.colors.local_yellow
        default:
            return theme.colors.local_white
    }
}