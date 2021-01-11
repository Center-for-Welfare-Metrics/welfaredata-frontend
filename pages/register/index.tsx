import Register from "../../components/auth/register"
import onlyGuest from "@/components/HOC/onlyGuest"

const RegisterPage = () => <Register />

export default onlyGuest(RegisterPage)