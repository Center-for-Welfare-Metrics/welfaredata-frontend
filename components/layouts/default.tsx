import NavBar from '../navbar'
import {Container} from './DeafultStyled'

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