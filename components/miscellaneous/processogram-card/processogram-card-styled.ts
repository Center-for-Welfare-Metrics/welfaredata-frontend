import styled from 'styled-components'
import SVG from 'react-inlinesvg'

export const Title = styled.div`
    color:${({theme}) => theme.colors.blue};
    font-size:${({theme}) => theme.fontSize.extraVeryLarge};
    z-index:2;
    text-align:center;
    font-weight:bold;
`

export const SvgBackground = styled(SVG)`
    transform-origin:0% 45%;
    transform:scale(4);
    width:10rem;
    height:10rem;
    opacity:.6;
    transition:opacity 500ms;
    :hover{
        transition:opacity 500ms;
    }
`

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    margin-left:4rem;
    cursor:pointer;
    :first-child{
        margin-left:0;
    }
    :hover{
        transform:scale(1.2);
        transition:transform 500ms;
        ${SvgBackground}{
            opacity:1;
        }
    }
    transition:transform 500ms;
`

