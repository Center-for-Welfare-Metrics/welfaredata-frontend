import styled, {css} from 'styled-components'

export const SvgContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    width:100%;
    height:100%;        
    z-index: 77;        
    > svg{        
        height:auto;            
        transition:stroke-opacity 500ms;
        overflow:visible; 
        z-index:77;
        width:80%;
        margin:auto;
        margin-top:2.5%;
        margin-bottom:2.5%;
        opacity:1;
        display:block;       
        min-height:5rem;
    }
    :first-child{
        > svg{
            margin-top:5%;
        }
    }
    :last-child{
        > svg{
            margin-bottom:5%;
        }
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

    @media(max-width:800px){
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

`