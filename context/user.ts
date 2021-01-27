import { createContext } from "react";

export interface IUser{
    name:string,
    _id:string,
    email:string,
    __v:number
}

export interface IUserContext {
    user:IUser,
    setUser(user:IUser):void,
    logOut():void
}

const UserContext = createContext<IUserContext>(null)


export default UserContext