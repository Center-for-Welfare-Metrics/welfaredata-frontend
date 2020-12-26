import styles from './submit-button.module.scss'

const SubmitButton = ({
    onClick,
    children
}) => {

    return (
        <button className={styles.container} type='button' onClick={onClick}>{children}</button>
    )
}



export default SubmitButton