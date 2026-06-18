import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import CadastroLivro from "../pages/cadastroLivro/CadastroLivro"
import CadastroGenero from "../pages/genero/CadastroGenero"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/livro" element={<CadastroLivro/>} />
                <Route path="/genero" element={<CadastroGenero />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas