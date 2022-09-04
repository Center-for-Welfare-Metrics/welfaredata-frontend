import DataEntryContext from '@/context/data-entry'
import { useContext } from 'react'
import ProcessogramCard from '../miscellaneous/processogram-card'
import { Container } from './specie-selector-styled'

const SpecieSelector = () => {

    return (
        <Container>
            <ProcessogramCard 
                title='Pig'
                specie='pig'
                productionSystem='conventional intensive'
            />
            <ProcessogramCard 
                title='Chicken'
                specie='chicken'
                productionSystem='conventional cages'
            />
        </Container>
    )
}




export default SpecieSelector