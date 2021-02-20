import { SecondaryCard } from '@/components/common/cards/cards'
import styled from 'styled-components'
import {lighten} from 'polished'

export const Container = styled(SecondaryCard)`
    box-shadow: 0px 0px 5px 0 ${({theme})=> lighten(0.1,theme.colors.local_black)};
    width:18rem;
    height:fit-content;
    margin-top:1rem;
    cursor:pointer;
    :first-child{
        margin-top:0;
    }
    :hover{
        transform:scale(1.1);
        transition:transform 500ms;
    }
    transition:transform 500ms;
    display:flex;
    flex-direction:column;
    padding:.5rem;
    padding-top:0;
    color:white;
`


export const RoleName = styled.h2`
    font-weight:400;
    margin:0;
`


export const RoleDescription = styled.h3`
    font-weight:300;
    margin:0;
`