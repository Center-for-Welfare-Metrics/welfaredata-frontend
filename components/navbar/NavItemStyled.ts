import styled from 'styled-components'
import {lighten} from 'polished'

export const Name = styled.div`
    color:${({theme})=>theme.colors.local_blue};
    cursor: pointer;
    transition: color 500ms;
    font-weight: bold;
`

export const Childrens = styled.div`
    position: absolute;
    left:1rem;
    display:flex;
    flex-direction: column;
    overflow-y: hidden;
    transition: all 500ms;
    
`

export const Children = styled.div`
    
`

export const Container = styled.div`
    position:relative;
    margin:0 1rem 0 1rem;
    :first-child{
        margin-left:2rem;
    }
    :hover ${Name}{
        color:${({theme})=> lighten(0.25,theme.colors.local_blue) };
        transition: color 500ms;
    }
`