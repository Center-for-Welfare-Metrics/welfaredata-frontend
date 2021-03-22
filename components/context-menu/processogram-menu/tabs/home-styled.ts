import styled from 'styled-components'

export const Footer = styled.div`
    border-top:5px solid ${({theme})=>theme.colors.pink};
    display:flex;
    height:fit-content;
`


export const ButtonNavigator = styled.div`
    padding:.5rem .5rem 0 .5rem;
    border:none;
    cursor: pointer;
`


export const ButtonIcon = styled.img`
    width:100%;
    height:auto;
`

export const Description = styled.div`
    margin-top:.5rem;
`


export const Title = styled.div`
    text-align:center;
`