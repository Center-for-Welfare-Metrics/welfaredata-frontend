import styles from './default.module.scss'

const DefaultLayout = ({children}) => (
    <div className={styles.container}>
        {children}
    </div>
)

export default DefaultLayout