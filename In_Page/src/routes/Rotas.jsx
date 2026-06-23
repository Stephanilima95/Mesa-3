import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"
import CadastroLivro from "../pages/cadastroLivro/CadastroLivro"
import CadastroGenero from "../pages/genero/CadastroGenero"
import PrivateRoutes from "../routes/PrivateRoutes"
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastro" element={<CadastroUsuario/>} />
                <Route path="/livro" element={
                    <PrivateRoutes>
                    <CadastroLivro/>
                    </PrivateRoutes>
                    } />
                <Route path="/genero" element={
                    <PrivateRoutes>
                    <CadastroGenero />
                    </PrivateRoutes>
                    } />
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas