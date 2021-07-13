import { transparentize } from 'polished'
import styled from 'styled-components'

export const ThumbnailImage = styled.div`
    width:5rem;
    height:3rem; 
    background-clip:content-box;
    background-position: center;
    background-size:cover;
    background-repeat:no-repeat;
`

export const Image = styled.img`
    max-width:80vw;
    height:auto;
    max-height:80vh;
`

export const Container = styled.div`
    background-color: ${(transparentize(0.5,'black'))};
    backdrop-filter: blur(5px);
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    z-index:999;
    display:flex;
    flex-direction:column;
    justify-content:center;    
`