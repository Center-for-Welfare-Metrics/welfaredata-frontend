import styled from 'styled-components'





export const MediaList = styled.div`
    color:white;    
    display:flex;
    flex-wrap:wrap;    
`

export const FullScreenImage = styled.img`
    width:100%;
    height:auto;
`


export const MediaStyled = styled.div`
    border:.25rem solid transparent;
    box-sizing:border-box;
    cursor: pointer;   
    flex: 0 0 33.3333%;
    height:5rem; 
    background-clip:content-box;
    background-position: center;
    background-size:cover;
    background-repeat:no-repeat;
    @media(min-width:800px){
        flex: 0 0 25%;
    }
`