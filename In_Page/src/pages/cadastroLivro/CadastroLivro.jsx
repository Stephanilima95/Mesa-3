import { useEffect, useState } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import api from "../../services/services";

const CadastroLivro = () => {

  const [valor, setValor] = useState("");
  const [valorSelect, setValorSelect] = useState("");
  const [valorAtor, setValorAtor] = useState("");
  const [listaGeneros, setListaGeneros] = useState([]);

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
    <>
      <Cadastro
        tituloCadastro="Cadastro de livro"
        placeholder="livro"
        funcCadastro={console.log}
        Editar={false}
        valor={valor}
        setValor={setValor}
        valorSelect={valorSelect}
        setValorSelect={setValorSelect}
        valorAtor={valorAtor}
        setValorAtor={setValorAtor}
        listaGeneros={[]}
        setImg={console.log}
        cancelarEdicao={console.log}
      />

      <Lista
        tituloLista="Lista de livros"
        funcResumo={console.log}
        tipoLista="livro"
        lista={listaGeneros}
        // dunção que muda o state
        funcExcluir={excluirGenero}
        funcEditar={preEditar}
      />
    </>
  );
};

export default CadastroLivro;