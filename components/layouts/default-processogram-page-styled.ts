import styled from 'styled-components'



export const Container = styled.div`
    height:${({full}) => full?'100vh':'90vh'};    
    overflow:auto;    
    position:relative;    
`