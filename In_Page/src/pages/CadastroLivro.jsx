import "./CadastroLivro.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cadastro from "../../components/Cadastro";
import Lista from "../../components/Lista";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Alerta } from "../../components/Alerta";

const CadastroLivro = () => {
  const [valor, setValor] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [listaLivros, setListaLivros] = useState([]);
  const [editar, setEditar] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const limparFormulario = () => {
    setValor("");
    setAutor("");
    setGenero("");
    setEditar(false);
    setIdEditar(null);
  };

  const cadastrarLivro = async (e) => {
    e.preventDefault();

    if (valor.trim() === "") {
      Alerta({
        title: "Atenção",
        text: "O título do livro não pode estar em branco.",
        icon: "warning",
      });
      return;
    }

    try {
      const livro = {
        titulo: valor,
        autor,
        genero,
      };

      await api.post("/Livro", livro);

      limparFormulario();
      getLivros();

      Alerta({
        title: "Sucesso!",
        text: "Livro cadastrado com sucesso.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);

      Alerta({
        title: "Erro",
        text: "Erro ao cadastrar livro.",
        icon: "error",
      });
    }
  };

  const editarLivro = async (e) => {
    e.preventDefault();

    try {
      const livro = {
        titulo: valor,
        autor,
        genero,
      };

      await api.put(`/Livro/${idEditar}`, livro);

      limparFormulario();
      getLivros();

      Alerta({
        title: "Sucesso!",
        text: "Livro atualizado com sucesso.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);

      Alerta({
        title: "Erro",
        text: "Erro ao atualizar livro.",
        icon: "error",
      });
    }
  };

  const excluirLivro = async (item) => {
    const result = await Alerta({
      title: "Excluir Livro",
      text: `Deseja excluir o livro ${item.titulo}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/Livro/${item.idLivro}`);

      getLivros();

      Alerta({
        title: "Excluído!",
        text: "Livro removido com sucesso.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);

      Alerta({
        title: "Erro",
        text: "Erro ao excluir livro.",
        icon: "error",
      });
    }
  };

  const preEditar = (item) => {
    setValor(item.titulo);
    setAutor(item.autor);
    setGenero(item.genero);
    setIdEditar(item.idLivro);
    setEditar(true);
  };

  const getLivros = async () => {
    try {
      const retornoAPI = await api.get("/Livro");

      setListaLivros(retornoAPI.data);
    } catch (error) {
      console.log(error);

      Alerta({
        title: "Erro",
        text: "Erro ao buscar livros.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getLivros();
  }, []);

  return (
    <>
      <Header />

      <main>
        <Cadastro
          tituloCadastro="Cadastro de Livros"
          placeholder="Digite o título do livro"
          valor={valor}
          setValor={setValor}
          autor={autor}
          setAutor={setAutor}
          genero={genero}
          setGenero={setGenero}
          funcCadastro={editar ? editarLivro : cadastrarLivro}
          btnEditar={editar}
          cancelarEdicao={limparFormulario}
        />

        <Lista
          tituloLista="Lista de Livros"
          lista={listaLivros}
          funcEditar={preEditar}
          funcExcluir={excluirLivro}
        />
      </main>

      <Footer />
    </>
  );
};

export default CadastroLivro;