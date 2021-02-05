import NavBar from '../navbar'
import {Container} from './deafultStyled'

interface IDefaultLayout{
    children:React.ReactNode
}

const DefaultLayout = ({children}:IDefaultLayout) => (
    <Container>
        <NavBar />
        {children}
    </Container>
)

export default DefaultLayout