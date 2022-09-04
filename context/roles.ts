import { createContext } from "react";


export interface Ican {
    create:string[],
    read:string[],
    update:string[]
    delete:string[]
}



export interface IRole{
    name:string,
    description:string,
    can:Ican,
    _id?:string,
    __v?:number
}

const RoleContext = createContext<IRole>(null)


export default RoleContext