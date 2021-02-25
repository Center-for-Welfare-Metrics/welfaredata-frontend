import ProcessogramCard from '../miscellaneous/processogram-card'
import { Container } from './dataentry-processogram-styled'

const DataEntryProcessogramPage = () => {

    return (
        <Container>
            <ProcessogramCard 
                title='Pig'
                specie='pigs'
                productionSystem='conventional intensive'
            />
            <ProcessogramCard 
                title='Laying Hens'
                specie='hens'
                productionSystem='conventional cages'
            />
        </Container>
    )
}




export default DataEntryProcessogramPage