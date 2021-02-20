import { createContext } from "react";
import { IRole } from "./roles";

export interface IPrivileges{
    roles:IRole[]
    setRoles(roles:IRole[]):void
    fetchRoles():void
}

const PrivilegesContext = createContext<IPrivileges>(null)

export default PrivilegesContext