import "./Lista.css";

import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";

const Lista = (props) => {
    return (
        <section className="layout_grid">
            <div className="listagem">

                <h1>{props.tituloLista}</h1>

                <hr />

                <div className="tabela">
                    <table>

                        <thead>
                            <tr className="table_cabecalho">

                                <th>Título</th>
                                <th>Autor</th>
                                <th>Gênero</th>
                                <th>Editar</th>
                                <th>Excluir</th>

                            </tr>
                        </thead>

                        <tbody>

                            {props.lista?.length > 0 ? (

                                props.lista.map((item) => (

                                    <tr
                                        className="item_lista"
                                        key={item.idLivro}
                                    >

                                        <td data-cell="Título">
                                            {item.titulo}
                                        </td>

                                        <td data-cell="Autor">
                                            {item.autor}
                                        </td>

                                        <td data-cell="Gênero">
                                            {item.genero}
                                        </td>

                                        <td data-cell="Editar">
                                            <button
                                                className="icon"
                                                onClick={() => props.funcEditar(item)}
                                            >
                                                <img
                                                    src={Editar}
                                                    alt="Editar"
                                                />
                                            </button>
                                        </td>

                                        <td data-cell="Excluir">
                                            <button
                                                className="icon"
                                                onClick={() => props.funcExcluir(item)}
                                            >
                                                <img
                                                    src={Excluir}
                                                    alt="Excluir"
                                                />
                                            </button>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="5">
                                        Nenhum livro encontrado.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>
                </div>

            </div>
        </section>
    );
};

export default Lista;