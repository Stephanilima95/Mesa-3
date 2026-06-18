import Swal from "sweetalert2";
import Lista from "../../components/lista/Lista";
import "./CadastroGenero.css";
import { useEffect, useState } from "react";
import api from "../../services/services";

const CadastroGenero = () => {

    // const apiUrl = "https://localhost:7187/api/Genero";

    const [genero, setGenero] = useState("");
    const [editar, setEditar] = useState(false);
    const [listaGeneros, setListaGeneros] = useState([]);

    const cadastrarGenero = () => {
        console.log("Cadastrar:", genero);
        setGenero("");
    };

    const atualizarGenero = () => {
        console.log("Atualizar:", genero);
        setGenero("");
        setEditar(false);
    };

    const cancelarEdicao = () => {
        setGenero("");
        setEditar(false);
    };






    const excluirGenero = async () => {

    }

    const preEditar = async () => {

    }


    const getGeneros = async () => {

        try {
            const retornoAPI = await api.get("/genero")// chama a api
            const dados = await retornoAPI.data// extrai os dados retornados
            setListaGeneros(dados)// guarda os dados no state (já exibe na lista)
            console.log(retornoAPI.data);

        } catch (error) {
            console.log(error);
            
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao retornar os dados da API",
                icon: "error"
            })
        }
    }



    useEffect(() => {
        // chamar os dados da api
        getGeneros()
    }, [])






    return (


        <div className="cadastro-genero">

            <section className="secao-cadastro">
                <h1>CADASTRO DE GÊNEROS</h1>

                <div className="linha"></div>

                <div className="formulario-genero">
                    <div className="campo">
                        <label>Gênero</label>

                        <input
                            type="text"
                            placeholder="Digite o nome do gênero"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={editar ? atualizarGenero : cadastrarGenero}
                    >
                        {editar ? "Atualizar" : "Cadastrar"}
                    </button>

                    {editar && (
                        <button
                            className="btn-cancelar"
                            onClick={cancelarEdicao}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </section>

            {/* <section className="secao-lista">
                <h2>LISTA DE GÊNEROS</h2>

                <div className="linha"></div>

            </section> */}



            <Lista
                tituloLista="Gênero de Livros"
                funcResumo={console.log}
                tipoLista="genero"
                lista={listaGeneros}
                // dunção que muda o state
                funcExcluir={excluirGenero}
                funcEditar={preEditar}
            />

        </div>




    );
};

export default CadastroGenero;