import styled from 'styled-components'
import {lighten} from 'polished'



export const Container = styled.div`
    box-shadow: 0px 0px 4.5px -2px ${({theme})=> lighten(0.08,theme.colors.white)};
    padding:2rem;
    overflow-y:auto;
    max-height:35rem;
    ::-webkit-scrollbar {
        width: .25rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors.pink};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.pink)};
        transition: background-color 500ms;
    }
`


export const PrimaryCard = styled(Container)`
    background-color:${({theme})=>theme.colors.deep_blue};
`

export const SecondaryCard = styled(Container)`
    background-color:${({theme})=>theme.colors.pink};
`

export const SuccessCard = styled(Container)`
    background-color:${({theme})=>theme.colors.green};
`

export const WarningCard = styled(Container)`
    background-color:${({theme})=>theme.colors.yellow};
`

export const DangerCard = styled(Container)`
    background-color:${({theme})=>theme.colors.red};
`