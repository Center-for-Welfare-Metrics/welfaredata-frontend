import styled from 'styled-components'

import Loader from "react-loader-spinner";

export const CustomLoader = styled(Loader)`
    
`

export const LoaderContainer = styled.div`
    color:${({theme}) => theme.colors.blue};
    top:40%;
    left:50%;
    transform:translate(-50%,-50%); 
    position:absolute;
    display: flex;
    flex-direction:column;
    align-items: center;
`

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
    padding:0 4rem 0 4rem;
    width:60%;
    height:800px;
    position:relative;
    overflow:auto;
`

export const Container = styled.div`
    display:flex;
    padding:2rem;
`
