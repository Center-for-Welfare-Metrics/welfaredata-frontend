import { lighten } from 'polished'
import styled from 'styled-components'

export const NoProductionSystemSelected = styled.div`

`

export const SubTitle = styled.h2`
    color:${({theme})=>theme.colors.local_white};
    text-align:center;
`

export const Title = styled.h1`
    color:${({theme})=>theme.colors.local_white};
    text-align:center;
`

export const FormSpace = styled.div`
    width:40%;
`

export const ProcessogramSpace = styled.div`
    ::-webkit-scrollbar {
        width: .25rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${({theme})=>theme.colors.local_pink};
        transition: background-color 500ms;
        border-radius:2rem;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color: ${({theme})=> lighten(0.1,theme.colors.local_pink)};
        transition: background-color 500ms;
    }
    padding:0 4rem 0 4rem;
    width:60%;
    max-height:800px;
    position:relative;
    overflow-x:hidden;
    overflow-y:scroll;
`

export const Container = styled.div`
    display:flex;
    padding:2rem;
`
