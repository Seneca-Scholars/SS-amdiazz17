import { useContext } from "react";
import { DarkModeContext } from "../dmcontext";
import { Lightswitch } from "./lightswitch"
import "./Display.scss"
export function Container(){

    const context = useContext(DarkModeContext)
    if (!context) {
        console.error("DarkModeContext is undefined")
        return null;
    }
    const {darkMode} = context;
    return(
        <div className= { darkMode ? 'Container Container-dark' : 'Container Container-light' }>
            <Lightswitch/>
        </div>
    )
}

export default Container