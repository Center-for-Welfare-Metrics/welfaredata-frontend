import styles from './it-button.module.scss'


const PostItButton = (
    {
        icon,
        name,
        onClick=()=>{}
    }
) => (
    <button onClick={onClick} type='button' title={name} className={styles.container}>
        <img src={`/assets/svg/minimal-icons/${icon}`} />
    </button>
)


export default PostItButton