import { transparentize } from 'polished'
import styled , {css} from 'styled-components'

export const Container = styled.div`
    padding:10%;
    ${({hover}) => hover?css`
        svg{
            stroke-opacity: .5;
        }
        svg#${hover}{
            stroke-opacity: 1;
        }
    `:
    css`
        svg{
            stroke-opacity: 1;
        }
    `    
}
`