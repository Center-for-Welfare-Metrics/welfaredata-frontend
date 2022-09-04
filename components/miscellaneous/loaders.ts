import styled from 'styled-components'

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