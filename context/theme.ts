import { createContext } from "react";



export interface IThemeContext {
    theme:any,
    setTheme(theme:any):void
}

const ThemeContext = createContext<IThemeContext>(null)


export default ThemeContext