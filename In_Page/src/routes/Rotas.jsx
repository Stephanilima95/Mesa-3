import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/login/Login"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas