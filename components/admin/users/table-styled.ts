import styled from 'styled-components'

export const Container = styled.div`
    margin-top:5rem;
`

export const Table = styled.table`
    color:${({theme})=>theme.colors.local_white};
    border-collapse: collapse;
`


export const Td = styled.td`
    border: 1px solid ${({theme})=>theme.colors.local_blue};
    text-align: left;
    padding: 8px;
`

export const Th = styled(Td)`

`

export const Tr = styled.tr`
    :nth-child(even){
        background-color:${({theme})=>theme.colors.local_black}
    }
`