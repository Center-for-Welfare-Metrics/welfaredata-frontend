import { createContext } from "react";

const UserContext = createContext({
    user:null,
    setUser:(user:any) => {},
    logOut:()=>{}
})


export default UserContext