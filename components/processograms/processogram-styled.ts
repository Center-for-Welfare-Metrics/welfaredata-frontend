import styled, {css} from 'styled-components'



export const SvgContainer = styled.div`
    margin:5% 0 5% 0;
    svg{
        height:auto;
    }
    ${({innerlevel,hover,level}) => level>0 && css`
        ${
            hover?css`
                [id*=${innerlevel}]{
                    transition:stroke-opacity 500ms;
                    stroke-opacity:.5;
                }
                #${hover}{
                    transition:stroke-opacity 500ms;
                    stroke-opacity: 1;
                }
            `
            :
            css`
                [id*=${innerlevel}]{
                    transition:stroke-opacity 500ms;
                    stroke-opacity:1;
                }
            `
        }
    `}
`