import NavBar from '../navbar'
import {Container,Content} from './deafult-styled'

interface IDefaultLayout{
    children:React.ReactNode
}

const DefaultLayout = ({children}:IDefaultLayout) => (
    <Container>
        <NavBar />
        <Content>
            {children}
        </Content>
    </Container>
)

export default DefaultLayout