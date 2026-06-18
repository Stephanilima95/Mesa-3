import "./Cadastro.css";
import Botao from "../botao/Botao";

const Cadastro = (props) => {
  return (
    <section className="section_cadastro">
      <form onSubmit={props.funcCadastro} className="layout_grid form_cadastro">
        <h1>{props.tituloCadastro}</h1>
        <hr />

        <div className="campos_cadastro">
            <div className="campo_cad_nome">
              {props.visibilidade !== null ? (
                <label htmlFor="titulo">Título</label>
              ) : (
                <label htmlFor="nome">Nome</label>
              )}

              <input
                type="text"
                name={props.visibilidade !== null ? "titulo" : "nome"}
                placeholder={`Digite o ${props.visibilidade !== null ? "titulo" : "nome"} do ${props.placeholder}`}
                value={props.valor}
                onChange={(e) => props.setValor(e.target.value)}
              />
            </div>

          <div
            className="campo_cad_genero"
            style={{ display: props.visibilidade }}
          >
            <label htmlFor="genero">Gênero</label>
            <select
              name="genero"
              value={props.valorSelect}
              onChange={(e) => props.setValorSelect(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>

              {props.listaGeneros?.map((item) => (
                <option key={item.idGenero} value={item.idGenero}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="campo_cad_nome">
            <label htmlFor="autor">Autor</label>
            <input type="text" name="autor" placeholder="Digite o nome do autor" value={props.valorAtor} onChange={(e) => props.setValorAtor(e.target.value)}/>
          </div>

          <div className="campo_cad_img" style={{ display: props.visibilidade }}>
            <label htmlFor="img">Imagem</label>

            <label htmlFor="img" className="custom-file-upload">
              Escolher imagem
            </label>

            <input
              type="file"
              name="img"
              id="img"
              accept="image/*"
              onChange={(e) => props.setImg(e.target.files[0])}
            />
          </div>

          {props.Editar && (
            <Botao
              nomeDoBotao="Cancelar"
              type="button"
              onClick={props.cancelarEdicao}
            />
          )}

          <Botao
            nomeDoBotao={props.Editar ? "Salvar" : "Cadastrar"}
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default Cadastro;
