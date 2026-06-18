import "./CadastroUsuario.css";
import Logo from "/public/Logo-Maior.png";
import Botao from "../../components/botao/Botao";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../../context/UsuarioContext";
import api from "../../services/services";
import { jwtDecode } from "jwt-decode";
import { Alerta } from "../../components/alerta/Alerta";

const CadastroUsuario = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();
    const { setUsuario } = useContext(UsuarioContext);

    const cadastrar = async () => {
        if (
            nome.trim().length === 0 ||
            email.trim().length === 0 ||
            senha.trim().length === 0
        ) {
            Alerta({
                title: "Atenção",
                text: "O cadastro não pode estar em branco.",
                icon: "warning",
                confirmButtonText: "Ok",
            });
            return;
        }

        const dadosLogin = {
            Nome: nome,
            Email: email,
            Senha: senha,
        };

        try {
            await api.post("/Usuario", dadosLogin);

            const retornoAPI = await api.post("/Login", {
                email: email,
                senha: senha,
            });

            const token = retornoAPI.data.token;
            const usuarioDecoded = jwtDecode(token);

            setUsuario(usuarioDecoded);
            localStorage.setItem("usuario", JSON.stringify(usuarioDecoded));

            navigate("/livro");

            setNome("");
            setEmail("");
            setSenha("");
        } catch (error) {
            console.log(error.response);
            console.log(error.response?.data);
        }
    };

    return (
        <main className="main_cadastro_usuario">
            <div className="banner_cadastro_usuario"></div>

            <section className="section_cadastro_usuario">
                <h1 className="InPage">InPage</h1>
                <form className="form_cadastro_usuario">
                    <h1>Cadastro</h1>

                    <div className="campos_cadastro_usuario">
                        <div className="campo_input_cadastro">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                name="nome"
                                placeholder="Digite seu nome"
                            />
                        </div>

                        <div className="campo_input_cadastro">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                placeholder="Digite seu e-mail"
                            />
                        </div>

                        <div className="campo_input_cadastro">
                            <label htmlFor="senha">Senha:</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                name="senha"
                                placeholder="Digite sua senha"
                            />
                        </div>
                    </div>

                    <Botao
                        nomeDoBotao="Cadastrar"
                        onClick={(e) => {
                            e.preventDefault();
                            cadastrar();
                        }}
                    />

                    <p>
                        Já tem uma conta? <Link to="/">Entrar</Link>
                    </p>
                </form>
            </section>
        </main>
    );
};

export default CadastroUsuario;