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
    border-left:none;
    border-right:none;
    text-align: left;
    padding: 8px;
    :first-child{
        border-left:1px solid ${({theme})=>theme.colors.local_blue};
    }
    :last-child{
        border-right:1px solid ${({theme})=>theme.colors.local_blue};
    }
`

export const Th = styled(Td)`
    
`

export const Tr = styled.tr`
    
`