import styles from './submit-button.module.scss'

const SubmitButton = ({
    children
}) => {

    return (
        <button type='submit' className={styles.container}>{children}</button>
    )
}



export default SubmitButton