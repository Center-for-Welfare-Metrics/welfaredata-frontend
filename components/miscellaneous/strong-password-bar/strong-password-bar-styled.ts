import styled from 'styled-components'
import { darken,lighten } from 'polished'

let baseLine = '0.05rem'

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

export const LineContainer = styled.div`
    display:flex;
    padding:0 ${baseLine} 0 ${baseLine};
`

export const Line = styled.div`
    width:2rem;
    height:.5rem;
    background-color:${({theme,current,strength})=> {
        let color = theme.colors.local_red
        if(strength>1){
            color = darken(0.1,theme.colors.local_green)
        }

        if(strength>=current){
            color = lighten(0.1,theme.colors.local_green)
        }        
        return color
    }};
    transition:background-color 1s;
    margin:0 ${baseLine} 0 ${baseLine};
`

export const StrengthText = styled.span`
    color:${({theme,strength})=>{
        let color = theme.colors.local_red

        if(strength==1){
            color = lighten(0.05,theme.colors.local_red)
        }

        if(strength>1){
            color = darken(0.1,theme.colors.local_green)
        }

        if(strength>2){
            color = lighten(0.1,theme.colors.local_green)
        }
        return color
    }};
    transition:color 1s;
`