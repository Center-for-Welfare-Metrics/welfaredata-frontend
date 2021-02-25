import { GetColorType } from '@/utils/theme'
import styled from 'styled-components'
import { lighten, transparentize,darken } from 'polished'

export const PermissionName = styled.div`
    position:absolute;
    top:-1rem;
    left:.5rem;
    background-color:${({theme})=>theme.colors.local_black};
`

export const GrantedContainer = styled.div`
    display:flex;
    padding:0 .5rem 0 .5rem;
    height:100%;
    align-items:center;
`

export const DeleteGranted = styled.div`
    :before{
        content:'X'
    }
    margin-left:-.25rem;
    border-radius:.5rem;
    color:${({theme}) => lighten(0.1,GetColorType({theme,type:'danger'})) };
    background-color:${({theme})=>transparentize(0.7,theme.colors.local_black)};
    position:absolute;
    top:0;
    width:100%;
    font-weight:bold;
    text-align:center;
    font-size:1rem;
    :hover{
        transition:opacity 500ms;
    }
    transition:opacity 500ms;
`

export const Granted = styled.div`
    margin-left:.5rem;
    padding:0 .25rem 0 .25rem;
    border-radius:.5rem;
    height:fit-content;
    :first-child{
        margin-left:0;
    }
    background-color:${({theme}) => transparentize(0.5,theme.colors.local_red)};
    cursor: pointer;
    position:relative;
    ${DeleteGranted}{
        opacity:0;
    }
    :hover{
        ${DeleteGranted}{
            opacity:1;
        }
    }
`


export const HelperMessage = styled.div`
    
`

export const AddGranted = styled.button`
    border:none;
    margin-left:.5rem;
    color:white;
    border-radius:.5rem;
    height:fit-content;
    cursor: pointer;
    outline:none;
    :hover{
        transform:scale(1.2);
        transition:transform 500ms, opacity 500ms;
    }
    transition:transform 500ms, opacity 500ms;
    :before{
        content:'+'
    }
`

export const GrantedOption = styled.div`
    padding:.25rem;
    cursor: pointer;
    :first-child{
        border-top-left-radius:.5rem;
        border-top-right-radius:.5rem;
    }
    :last-child{
        border-bottom-left-radius:.5rem;
        border-bottom-right-radius:.5rem;
    }
` 

export const GrantedListStyled = styled.div`
    width:fit-content;
    height:fit-content;
    z-index:103;
    margin-left:.5rem;
    border-radius:.5rem;
`

export const GrantedListBackground = styled.div`
    background-color:transparent;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:102;
`

export const Container = styled.div`
    width:100%;
    height:3rem;
    max-height:3rem;
    margin-top:1.5rem;
    position:relative;
    border:3px solid ${({theme,type}) => GetColorType({theme,type})};
    border-radius:1rem;
    ${PermissionName},${HelperMessage}{
        color:${({theme,type}) => GetColorType({theme,type})};
    };
    ${Granted},${AddGranted},${GrantedListStyled}{
        background-color:${({theme,type}) => transparentize(0.5,GetColorType({theme,type}))};
    }
    ${AddGranted}{
        opacity:0;
    }
    ${GrantedOption}{
        :hover{
            background-color:${({theme,type}) => darken(0.3,GetColorType({theme,type})) };
        }
    }
    :hover{
        border:3px solid ${({theme,type}) => lighten(0.2,GetColorType({theme,type}))};
        ${AddGranted}{
            opacity:1;
        }
        transition:border 500ms;
    }
    transition:border 500ms;
`

