import styled from 'styled-components'
import SVG from 'react-inlinesvg'

export const Title = styled.div`
    color:${({theme}) => theme.colors.pink};
    font-size:${({theme}) => theme.fontSize.extraVeryLarge};
    z-index:2;
    text-align:center;
    font-weight:bold;
`

export const SvgBackground = styled(SVG)`
    position:absolute;
    transform-origin:0% 25%;
    transform:scale(6);
    opacity:.6;
    transition:opacity 500ms;
    :hover{
        transition:opacity 500ms;
    }
`

export const Container = styled.div`
    width:10rem;
    height:10rem;
    position:relative;
    display:flex;
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

