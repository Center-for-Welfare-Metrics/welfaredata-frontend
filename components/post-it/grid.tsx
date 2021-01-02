import styles from './grid.module.scss'

const PostItGrid = ({children}) => (
    <div className={styles.container}>
        {children}
    </div>
)


export default PostItGrid