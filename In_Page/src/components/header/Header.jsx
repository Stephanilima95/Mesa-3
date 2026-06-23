import "./Header.css";
import Logo from "/public/Logo-Maior.png";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode"
const Header = () => {

    return (
        <header id="hearder">
            <div className="layout_grid cabecalho">
                <Link className="logo_header" to="/">
                    <img className="logo_header" src={Logo} alt="Logo do Filmoteca" />
                </Link>

                <nav className="nav_header">
                    <DarkMode />

                    <Link className="link_header" to="/livro">
                        Livros
                    </Link>

                    <Link className="link_header" to="/genero">
                        Gêneros
                    </Link>

                </nav>
            </div>
        </header>
    );
};

export default Header;