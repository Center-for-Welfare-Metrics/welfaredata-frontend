import { ICoolFormat } from "@/utils/processogram";
import { createContext } from "react";
import { ImainStateChange } from "./processogram";



export interface IHudContext {
    element:Element,    
    onChange(changes:ImainStateChange):void,
    stackCoolFormat:ICoolFormat[]
    shareString:string
}

const HudContext = createContext<IHudContext>(null)


export default HudContext