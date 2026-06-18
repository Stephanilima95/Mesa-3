import "./Login.css";

function Login() {
  return (
    <div className="container">
      <div className="left">
        <img
          src="/logo.png"
          alt="Logo"
          className="logo"
        />

        <h1>INPAGE</h1>
        <p>DESDE 2026</p>
      </div>

      <div className="right">
        <div className="login-box">
          <h1>InPage</h1>
          <h2>LOGIN</h2>

          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
          />

          <button>Entrar</button>

          <span>Não tem uma conta?</span>
        </div>
      </div>
    </div>
  );
}

export default Login;