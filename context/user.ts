import { createContext } from "react";
import { IRole } from "./roles";

export interface IUser{
    name:string,
    _id:string,
    email:string,
    __v:number,
    role?:IRole
}

export interface IUserContext {
    user:IUser,
    setUser(user:IUser):void,
    logOut():void
}

const UserContext = createContext<IUserContext>(null)


export default UserContext