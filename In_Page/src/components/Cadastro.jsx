import "./Cadastro.css";
import Botao from "../botao/Botao";

const Cadastro = (props) => {
    return (
        <section className="section_cadastro">
            <form
                onSubmit={props.funcCadastro}
                className="layout_grid form_cadastro"
            >
                <h1>{props.tituloCadastro}</h1>

                <hr />

                <div className="campos_cadastro">

                    <div className="campo_cad_nome">
                        <label htmlFor="nome">Nome</label>

                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder={`Digite o nome do ${props.placeholder}`}
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
                            id="genero"
                            value={props.valorSelect}
                            onChange={(e) =>
                                props.setValorSelect(e.target.value)
                            }
                        >
                            <option value="">
                                Selecione
                            </option>

                            {props.listaGeneros?.map((item) => (
                                <option
                                    key={item.idGenero}
                                    value={item.idGenero}
                                >
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div
                        className="campo_cad_imagem"
                        style={{ display: props.visibilidade }}
                    >
                        <label htmlFor="imagem">Imagem</label>

                        <input
                            type="file"
                            name="imagem"
                            id="imagem"
                            accept="image/*"
                            onChange={(e) =>
                                props.setImg(e.target.files[0])
                            }
                        />
                    </div>

                    {props.btnEditar && (
                        <Botao
                            nomeDoBotao="Cancelar"
                            cancelarEdicao={props.cancelarEdicao}
                            btnEditar={true}
                        />
                    )}

                    <Botao
                        nomeDoBotao={props.editar ? "Salvar" : "Cadastrar"}
                    />
                </div>
            </form>
        </section>
    );
};

export default Cadastro;