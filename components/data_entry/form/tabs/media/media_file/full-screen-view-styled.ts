import styled from 'styled-components'



export const Container = styled.div`

`

export const Content = styled.div`
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:498;
`

export const InnerContent = styled.div`
    position:relative;
    height:100%;
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.0980392) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.0980392) 75%, rgba(0, 0, 0, 0.0980392) 0), linear-gradient(45deg, rgba(0, 0, 0, 0.0980392) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.0980392) 75%, rgba(0, 0, 0, 0.0980392) 0), white;
    background-repeat: repeat, repeat;
    background-position: 0px 0, 5px 5px;    
    transform-origin: 0 0 0;    
    background-origin: padding-box, padding-box;
    background-clip: border-box, border-box;
    background-size: 10px 10px, 10px 10px;
    box-shadow: none;
    text-shadow: none;
    transition: none;
    transform: scaleX(1) scaleY(1) scaleZ(1);
    z-index:497;
`
