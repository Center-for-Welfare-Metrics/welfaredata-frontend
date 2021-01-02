import styles from './index.module.scss'


const PostIt = ({
    folder_icon='avatars',
    icon,
    children=null
}) => (
    <div className={styles.container}>
        <img className={styles.background_icon} src={`/assets/svg/${folder_icon}/${icon}`} />
        <div className={styles.buttons}>
            {children}
        </div>
    </div>
)



export default PostIt