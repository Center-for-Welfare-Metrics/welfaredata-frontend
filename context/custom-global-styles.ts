import { createContext } from "react"

export interface ICustomGlobalStyles {
    needFixedBody:boolean,
    setNeedFixedBody(needFixedBody:boolean):void
}


const CustomGlobalStyles = createContext<ICustomGlobalStyles>(null)


export default CustomGlobalStyles