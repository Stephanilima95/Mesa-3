import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import CadastroLivro from "../pages/cadastroLivro/CadastroLivro"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/livro" element={<CadastroLivro/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas