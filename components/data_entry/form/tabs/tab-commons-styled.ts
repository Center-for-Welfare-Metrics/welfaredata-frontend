import styled from 'styled-components'

export const Title = styled.div`
    color:${({theme})=> theme.colors.blue };
    font-size:${({theme}) => theme.fontSize.normal };
    display: flex;
    align-items:center;
    svg{
        width:1.5rem;
        margin-left:.5rem;
        cursor:pointer;
        path{
            fill:${({theme})=>theme.colors.blue} !important;
        }
    }  
`