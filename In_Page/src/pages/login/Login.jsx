import "./Login.css";
import Botao from "../../components/botao/Botao";
import { useContext, useState } from "react";
import { UsuarioContext } from "../../context/UsuarioContext";
import api from "../../services/services";
import { jwtDecode } from "jwt-decode";
import Logo from "/public/Logo.png"
import { Alerta } from "../../components/alerta/Alerta";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { setUsuario } = useContext(UsuarioContext);
  const navigate = useNavigate();

  const login = async () => {
    if (email.trim() === "" || senha.trim() === "") {
      Alerta({
        title: "Atenção",
        text: "O login não pode estar em branco.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const retornoAPI = await api.post("/Login", {
        email,
        senha,
      });

      const token = retornoAPI.data.token;
      const usuarioDecoded = jwtDecode(token);

      setUsuario(usuarioDecoded);
      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioDecoded)
      );

      navigate("/livro");

      setEmail("");
      setSenha("");
    } catch (error) {
      Alerta({
        title: "Login",
        text: "Usuário não encontrado",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="container">
      <main className="main_login">
<img src={Logo} alt="" />
        <section className="section_login">
          <h1 className="InPage">InPage</h1>

          <form className="form_login">
            <h1>Login</h1>

            <div className="campos_login">
              <div className="campo_input">
                <label>Email:</label>

                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="campo_input">
                <label>Senha:</label>

                <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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

            <p>Não tem uma conta?</p>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;