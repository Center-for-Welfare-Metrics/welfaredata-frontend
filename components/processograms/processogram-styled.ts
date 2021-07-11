import styled, {css} from 'styled-components'

export const SvgContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    width:100%;
    height:100%;        
    z-index: 77;        
    svg{        
        height:auto;            
        transition:opacity 500ms;   
        overflow:visible; 
        z-index:77;
        width:80%;
        margin:auto;
        margin-top:2.5%;
        margin-bottom:2.5%;
        opacity:1;
        display:block;       
    }
    :first-child{
        svg{
            margin-top:5%;
        }
    }
    :last-child{
        svg{
            margin-bottom:5%;
        }
    }
    ${
        ({level}) => level !== undefined && css`
            ${({childrens,hover,siblings,level}) => hover?css`
                svg{
                    stroke-opacity:.5;                    
                }
                svg #${hover}{
                    stroke-opacity:1;
                }
                `
                :
                css`
                    svg{
                        stroke-opacity:.5;
                    }
                    [id*=${siblings}]{
                        stroke-opacity:1;
                    }
                `    
            }
        `
    }    

    @media(max-width:800px){
        ${
        ({current,hover}) => (current !== undefined) && 
            css`                
                ${hover && css`
                    svg #${hover}{
                        stroke-opacity:.5;
                    }
                `}
                svg #${current}{
                    stroke-opacity:1;
                }
            `
        }
    }





`