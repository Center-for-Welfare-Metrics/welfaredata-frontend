import { GetColorType } from '@/utils/theme'
import styled from 'styled-components'
import { transparentize } from 'polished'

export const Title = styled.h1`
    text-align:left;
    margin:0;
    font-size:${({theme}) => theme.fontSize.large };
`

export const SubTitle = styled.h2`
    margin:0;
    text-align:left;
    font-size:1rem;
    font-size:${({theme}) => theme.fontSize.normal };
`

export const Container = styled.div`
    padding:.5rem 1rem .5rem 1rem;
    ${Title}{
        color:${({theme,type}) => GetColorType({theme,type})}
    }

    ${SubTitle}{
        color:${({theme,type}) => transparentize(0.4,GetColorType({theme,type}))}
    }
`


export const ActionButtons = styled.div`
    display:flex;
    justify-content:space-between;
`


