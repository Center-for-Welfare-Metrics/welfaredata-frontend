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
    overflow:hidden;
    border:.25rem solid transparent;
    box-sizing:border-box;
    height:5rem; 
    cursor: pointer;   
    flex: 0 0 33.3333%;
    img{
        width:100%;
    }
    @media(min-width:800px){
        flex: 0 0 25%;
    }
`