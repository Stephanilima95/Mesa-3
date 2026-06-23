import "./Lista.css";

// Importação de imagens:
import Editar from "/public/editar.png";
import EditarClaro from "/public/editarClaro.jpeg";
import Excluir from "/public/excluir.png";
import Resumo from "/public/resumo.png";
import { apiPort } from "../../services/services";
import { useContext } from "react";
import { TemaContext } from "../../context/TemaContext";

const Lista = (props) => {
    const { tema, setTema } = useContext(TemaContext)
    return (
        <section className="layout_grid">
            <div className="listagem" id="listagem">

                <h1>{props.tituloLista}</h1>
                <hr />
                <div className="tabela">
                    <table>
                        {/* cabeçalho da tabela: */}
                        <thead>
                            {/* tr => table row */}
                            <tr className="table_cabecalho">
                                <th style={{ display: props.visibilidade }}>Imagem</th>
                                {/* th => table head */}
                                {props.visibilidade !== null ? (
                                    <th className="table_cabecalho">Nome</th>
                                ) : (
                                    <th className="table_cabecalho">Nome</th>
                                )}
                                <th className="table_cabecalho" style={{ display: props.visibilidade }}>Gênero</th>
                                <th className="table_cabecalho" style={{ display: props.visibilidade }}>Autor</th>
                                <th className="table_cabecalho" style={{ display: props.visibilidade }}>Resumo</th>
                                <th className="table_cabecalho">Editar</th>
                                <th className="table_cabecalho">Excluir</th>
                            </tr>
                        </thead>
                        {/* tbody => corpo da tabela */}
                        <tbody>
                            {/* Verifica se a lista existe e tem itens */}
                            {props.lista && props.lista.length > 0 ? (
                                // Se houver itens, faz um map (laço) para renderizar cada item da lista
                                props.lista.map((item) => (
                                    <tr
                                        className="item_lista"
                                        key={
                                            props.tipoLista === "genero"
                                                ? item.id
                                                : item.id
                                        }
                                    >
                                        <td data-cell="Imagem" style={{ display: props.visibilidade }}>
                                            <img
                                                src={`https://localhost:${apiPort}/imagens/${item.imagem}`} // Ajuste a URL conforme necessário
                                                alt="fundo"
                                                style={{ display: props.visibilidade }}
                                            />
                                        </td>
                                        {/* {console.log(index)} */}
                                        {/* {console.log(item.idGenero)} */}
                                        <td data-cell="Nome">
                                            {/* Primeira célula da linha: mostra o nome (se for gênero) ou título (se for livro) */}
                                            {/* titulo == livro */}
                                            {props.tipoLista === "genero" ? item.nome : item.titulo}
                                        </td>
                                        <td data-cell="Gênero" style={{ display: props.visibilidade }}>
                                            {/* Segunda célula: mostra o nome do gênero caso o tipo da lista seja "livro".*/}
                                            {/* adicionar essa linha depois de fazer o metd de lista livro: */}
                                            {props.tipoLista === "livro" ? (item.idGeneroNavigation?.nome || '-') : '-'}
                                        </td>
                                        <td data-cell="Autor" style={{ display: props.visibilidade }}>
                                            {item.autor}
                                        </td>
                                        <td data-cell="Resumo" id="lixo" style={{ display: props.visibilidade }}>
                                            <button className="icon" onClick={() => props.funcResumo(item)}>
                                                <img src={tema === "dark" ? Resumo : Resumo} alt="Lixeira" />
                                            </button>
                                        </td>
                                        <td data-cell="Editar">
                                            <button className="icon" onClick={() => {
                                                props.funcEditar(item)
                                            }
                                            }>
                                                <img src={tema === "dark" ? Editar : Editar} alt="Caneta" />
                                            </button>
                                        </td>
                                        <td data-cell="Excluir">
                                            <button className="icon" onClick={() => props.funcExcluir(item)}>
                                                <img src={tema === "dark" ? Excluir : Excluir} alt="Lixeira" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // Caso a lista esteja vazia ou não exista, mostra uma linha dizendo que não há registros
                                <tr>
                                    <td>Nenhum registro encontrado.</td>
                                </tr>
                            )
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Lista;