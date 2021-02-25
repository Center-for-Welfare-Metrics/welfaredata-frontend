import NavBar from '../NAVBAR'
import {Container} from './deafult-styled'

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