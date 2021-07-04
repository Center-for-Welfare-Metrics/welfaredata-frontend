import { createContext } from "react";



export interface IHudContext {
    element:Element,    
    onChange(changes:any):void
}

const HudContext = createContext<IHudContext>(null)


export default HudContext