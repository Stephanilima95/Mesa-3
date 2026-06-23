import React, { useContext } from "react";
import "./DarkMode.css";
import { TemaContext } from "../../context/TemaContext";

const DarkMode = () => {
    const { tema, setTema } = useContext(TemaContext)
    const setDarkMode = () => {

        // alert()
        document.getElementById("listagem").setAttribute("data-theme", "dark");
        document.getElementById("cadastro").setAttribute("data-theme", "dark");
        document.getElementById("hearder").setAttribute("data-theme", "dark");
        localStorage.setItem("data-theme", "dark");
        setTema("dark")

    };

    const setLightMode = () => {
        document.getElementById("listagem").setAttribute("data-theme", "light");
        document.getElementById("cadastro").setAttribute("data-theme", "light");
        document.getElementById("hearder").setAttribute("data-theme", "light");
        localStorage.setItem("data-theme", "light");
        setTema("light")
    };
    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode()
    };
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>

            </label>
        </div>
    );
};

export default DarkMode;
