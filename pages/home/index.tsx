import { useContext } from "react"
import withAuth from "@/components/HOC/withAuth"
import DefaultLayout from "@/components/layouts/default"
import UserContext from '@/context/user'

const Home = () => {
    const {logOut} = useContext(UserContext)

    return (
        <DefaultLayout>
            <button onClick={logOut}>LOGOUT</button>
        </DefaultLayout>
    )
}


export default withAuth(Home)