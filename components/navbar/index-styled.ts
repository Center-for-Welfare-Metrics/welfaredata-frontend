import styled from 'styled-components'
import {lighten} from 'polished'

export const Containter = styled.div`
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    display:flex;
    justify-content: space-between;
    padding:1rem 0 1rem 0;
    background-color:${({theme})=>theme.colors.black};
`

export const NavItems = styled.div`
    display:flex;
`
export const UserSection = styled.div`
    display:flex;
    flex-direction: column;
    margin-right: 2rem;
`

export const UserName = styled.div`
    color:${({theme})=>theme.colors.green};
`

export const LogOut = styled.div`
    cursor: pointer;
    color:${({theme})=>theme.colors.blue};
    transition: all 500ms;
    :hover{
        color: ${({theme})=> lighten(0.25,theme.colors.blue) };
        transition: all 500ms;
    }
`