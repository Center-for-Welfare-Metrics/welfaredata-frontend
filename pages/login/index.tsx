import Login from "@/components/auth/login"
import onlyGuest from "@/components/HOC/onlyGuest"

const LoginPage = () => <Login />

export default onlyGuest(LoginPage)