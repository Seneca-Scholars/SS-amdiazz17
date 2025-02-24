import { useContext } from "react";
import { DarkModeContext } from "./dmcontext";
import "@theme-toggles/react/css/Lightbulb.css"
import { Lightbulb } from "@theme-toggles/react"

export function Lightswitch() {
    const context = useContext(DarkModeContext);

    if (!context) {
        console.error("Darkmodecontext undefined");
        return null;
    }

    const {darkMode, toggleDarkMode } = context;

    const handleClick = () => {
        toggleDarkMode();
    };

    return (
        <Lightbulb className="Lightswitch" toggled={darkMode} onClick={handleClick} duration={750} reversed/>
    );
}
