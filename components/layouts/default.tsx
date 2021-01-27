import NavBar from '../navbar'
import styles from './default.module.scss'

interface IDefaultLayout{
    children:React.ReactNode
}

const DefaultLayout = ({children}:IDefaultLayout) => (
    <div className={styles.container}>
        <NavBar />
        {children}
    </div>
)

export default DefaultLayout