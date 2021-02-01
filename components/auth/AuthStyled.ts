import styled from 'styled-components'
import { darken } from 'polished'


export const Container = styled.div`
    background-color: ${({theme})=>theme.colors.local_blue};
    display:flex;
    flex-direction: column;
    align-items: center;
    width:25rem;
    position: absolute;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
    box-shadow: 15px 17px 20px -5px rgba(55, 96, 139, 0.4);
    padding-bottom:1.5rem;
`


export const Form = styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
`

export const LinkTo = styled.span`
    margin-top:.5rem;
    color:white;
    a{
        color: ${({theme})=>theme.colors.local_yellow};
        transition: color 500ms;
    }
    a:hover{
        color: ${({theme})=> darken(0.1,theme.colors.local_yellow) };
        transition: color 500ms;
    }
`