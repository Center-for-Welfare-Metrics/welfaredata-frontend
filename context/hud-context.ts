import { ICoolFormat } from "@/utils/processogram";
import { createContext } from "react";



export interface IHudContext {
    element:Element,    
    onChange(changes:any):void,
    stackCoolFormat:ICoolFormat[]
}

const HudContext = createContext<IHudContext>(null)


export default HudContext