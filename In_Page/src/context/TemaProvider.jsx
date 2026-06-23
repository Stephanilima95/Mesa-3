import { useEffect, useState } from "react";
import { TemaContext } from "./TemaContext";

export const TemaProvider = ({ children }) => {
    const [tema, setTema] = useState("light")

    useEffect(() => {
        const temaAtual = localStorage.getItem("data-theme")
        setTema(temaAtual)
    }, []);


    return (
        <TemaContext.Provider value={{ tema, setTema }}>
            {children}
        </TemaContext.Provider>
    )
}