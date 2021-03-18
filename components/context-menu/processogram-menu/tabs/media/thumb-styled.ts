import styled from 'styled-components'


export const Image = styled.div`
    width:5.6rem;
    height:5.6rem;
    background-position:center;
    background-size:cover;
    background-color:${({theme}) => theme.colors.deep_blue};
    margin:.25rem;
`


export const Video = styled.video`
    height:100%;
    outline:none;
`

export const Thumbnail = styled.div`
    width:5.6rem;
    height:5.6rem;
    margin:.25rem;
    overflow:hidden;
    background-color:${({theme}) => theme.colors.deep_blue};
`