import { useState } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import api from "../../services/services";
import Header from "../../components/header/Header";

const CadastroLivro = () => {

  const [valor, setValor] = useState("");
  const [valorSelect, setValorSelect] = useState("");
  const [valorAtor, setValorAtor] = useState("");













  return (
    <>
    <Header />
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
        // dunção que muda o state
      />
    </>
  );
};

export default CadastroLivro;