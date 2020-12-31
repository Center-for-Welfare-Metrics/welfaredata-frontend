import { useContext } from "react"
import withAuth from "../components/HOC/withAuth"
import UserContext from '../context/user'

const Test = () => {
    const {logOut} = useContext(UserContext)

    return (
        <>
            <div>Rapaz</div>
            <button onClick={logOut}>Log out</button>
        </>
    )
}


export default withAuth(Test)