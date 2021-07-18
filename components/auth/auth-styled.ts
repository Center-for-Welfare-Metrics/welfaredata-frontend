import styled from 'styled-components'
import { transparentize } from 'polished'


export const Container = styled.div`
    background-color: ${({theme})=>theme.colors.deep_blue};
    display:flex;
    flex-direction: column;
    align-items: center;
    width:25rem;
    position: absolute;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
    box-shadow: 15px 17px 20px -5px ${({theme})=>transparentize(0.4,theme.colors.deep_blue)};    
    padding:1rem;
`


export const Form = styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
    width:100%;
`

export const LinkTo = styled.span`
    margin-top:.5rem;
    color:white;
    a{
        color: ${({theme})=>transparentize(0.6,theme.colors.yellow)};
        transition: color 500ms;
        margin-left:.5rem;
        cursor:not-allowed;
    }
    a:hover{
        transition: color 500ms;
    }
`