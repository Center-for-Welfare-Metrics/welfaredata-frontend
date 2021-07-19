import styled, {css} from 'styled-components'

export const SvgContainer = styled.div`       
    width:100%;
    margin:2rem 0;
    >svg{        
        height:auto;            
        transition:stroke-opacity 500ms;
        overflow:visible; 
        z-index:77;
        width:80%;
        margin-inline:auto;        
        opacity:1;
        display:block;       
        min-height:5rem;
        z-index: 77;
    }
    ${
        ({level}) => level !== undefined && (
            level<3?
                css`
                ${({childrens,hover,current}) => hover?css`
                    > svg{
                        stroke-opacity:.35;                    
                    }
                    #${current} #${hover}{
                        stroke-opacity:1;
                        transition:stroke-opacity 500ms;
                    }
                    `
                    :
                    css`
                        > svg{
                            stroke-opacity:.35;
                            transition:stroke-opacity 500ms;
                        }
                        #${current} [id*=${childrens}]{
                            stroke-opacity:1;
                            transition:stroke-opacity 500ms;
                        }
                    `    
                }
            `
            :
            css`
                > svg{
                    stroke-opacity:.35;
                }

                #${({current})=>current}{
                    stroke-opacity:1;
                    transition:stroke-opacity 500ms;
                }
            `
        )
    }    

    @media (hover: none){
        ${
        ({current,hover}) => (current !== undefined) && 
            css`                
                ${hover && css`
                    svg #${hover}{
                        stroke-opacity:.35;
                    }
                `}
                svg #${current}{
                    stroke-opacity:1;
                }
            `
        }
    }
    @media(max-width:800px){
        margin:1rem 0;
    }
`