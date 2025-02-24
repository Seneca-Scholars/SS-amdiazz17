import { useContext } from "react";
import { DarkModeContext } from "../dmcontext";

export function Lightswitch() {
    const context = useContext(DarkModeContext);

    if (!context) {
        console.error("Darkmodecontext undefined");
        return null;
    }

    const { darkMode, toggleDarkMode } = context;

    const handleClick = () => {
        toggleDarkMode();
    };

    return (
        <div className="Lightswitch">
        <button onClick={handleClick}>Dark Mode</button>
        </div>
    );
}
/*
<div className="Lightswitch">
<Lightbulb duration={750} reversed onClick={handleClick} />
</div>*/