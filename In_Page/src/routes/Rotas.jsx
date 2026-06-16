import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Livros from "../pages/Livros";
import Generos from "../pages/Generos";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/generos" element={<Generos />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Rotas;