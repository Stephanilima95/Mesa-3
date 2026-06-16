import "./Login.css";
import Logo from "../../assets/img/logo.svg";
import Botao from "../../components/botao/Botao";
import { EmailContext } from "../../Context/email/EmailContext";
import { SenhaContext } from "../../Context/senha/SenhaContext";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const { setEmail } = useContext(EmailContext);
    const { setSenha } = useContext(SenhaContext);

    const [novoEmail, setNovoEmail] = useState("");
    const [novoSenha, setNovoSenha] = useState("");

    const navigate = useNavigate();

    const login = () => {
        const usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuarios.find(
            (usuario) =>
                usuario.email === novoEmail &&
                usuario.senha === novoSenha
        );

        if (usuarioEncontrado) {
            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuarioEncontrado)
            );

            setEmail(novoEmail);
            setSenha(novoSenha);

            navigate("/livros");
        } else {
            alert("Usuário não cadastrado!");
        }
    };

    return (
        <div className="container">
            <main className="main_login">
                <div className="banner"></div>

                <section className="section_login">
                    <img src={Logo} alt="Logo da Biblioteca" />

                    <form className="form_login">
                        <h1>Login</h1>

                        <div className="campos_login">

                            <div className="campo_input">
                                <label>Email:</label>

                                <input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    value={novoEmail}
                                    onChange={(e) =>
                                        setNovoEmail(e.target.value)
                                    }
                                />
                            </div>

                            <div className="campo_input">
                                <label>Senha:</label>

                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={novoSenha}
                                    onChange={(e) =>
                                        setNovoSenha(e.target.value)
                                    }
                                />
                            </div>

                        </div>

                        <Botao
                            nomeDoBotao="Entrar"
                            onClick={(e) => {
                                e.preventDefault();
                                login();
                            }}
                        />

                        <p>
                            Não possui conta?{" "}
                            <Link to="/cadastro">
                                Cadastre-se
                            </Link>
                        </p>

                    </form>
                </section>
            </main>
        </div>
    );
};

export default Login;