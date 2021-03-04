import styled from 'styled-components'

export const Container = styled.div`
    background-size:cover;
    background-repeat: no-repeat;
    background-position:center;
    width:8rem;
    height:6rem;
    margin-left:.5rem;
    margin-bottom:.5rem;
    :first-child{
        margin-left:0;
    }
    overflow:hidden;
    cursor: pointer;
`

export const FullImage = styled.img`
    width:100%;
    height:auto;
`