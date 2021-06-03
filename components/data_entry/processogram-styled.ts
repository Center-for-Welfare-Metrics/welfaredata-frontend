import styled from 'styled-components'

export const NoProductionSystemSelected = styled.div`

`

export const SubTitle = styled.h2`
    color:${({theme})=>theme.colors.blue};
    text-align:center;
`

export const Title = styled.h1`
    color:${({theme})=>theme.colors.blue};
    text-align:center;
`

export const FormSpace = styled.div`
    width:40%;
`

export const ProcessogramSpace = styled.div`        
    width:60%;
    height:800px;   
    overflow:auto;
    position:relative;
`

export const Container = styled.div`
    display:flex;
    padding:2rem;
`
