import styled from 'styled-components'

export const Container = styled.div`
    flex: 1 0 21%;
    max-width:6rem;
    height:6rem;
    margin-right:.5rem;
    margin-bottom:.5rem;
    background-color:${({theme})=>theme.colors.deep_blue};
`

export const Image = styled.div`
    height:100%;
    width:auto;
    background-size:cover;
    background-repeat: no-repeat;
    background-position:center;
    overflow:hidden;
    cursor: pointer;
`

export const DialogMiniImage = styled.div`
    margin:.5rem 0 .5rem 0;
    width:5rem;
    height:5rem;
    background-size:cover;
    background-repeat: no-repeat;
    background-position:center;
`

export const Video = styled.video`
    height:100%;
    max-height:40rem;
    outline:none;
    cursor: pointer;
`

export const Thumb = styled.div`
    flex: 1 0 21%;
    height:6rem;
    overflow:hidden;
`

export const DialogVideo = styled.video`
    height:100%;
    width:auto;
    outline:none;
`

export const DialogMiniThumb = styled.div`
    width:5rem;
    height:5rem;
    margin:.5rem 0 .5rem 0;
    overflow:hidden;
`

export const FullImage = styled.img`
    width:100%;
    height:auto;
`