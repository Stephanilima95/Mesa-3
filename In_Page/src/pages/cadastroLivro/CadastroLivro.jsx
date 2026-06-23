import { useEffect, useState } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import api from "../../services/services";
import Header from "../../components/header/Header";
import { Alerta } from "../../components/alerta/Alerta";
import Footer from "../../components/footer/Footer";
import { gerarResumo } from "../../services/IAservices";

const CadastroLivro = () => {
  const [valor, setValor] = useState("");
  const [valorSelect, setValorSelect] = useState("");
  const [valorAtor, setValorAtor] = useState("");
  const [img, setImg] = useState("");
  const [editar, setEditar] = useState(false);
  const [lista, setLista] = useState([]);
  const [idEditar, setIdEditar] = useState("");
  const [listaGeneros, setListaGeneros] = useState([]);
  const [showLoading, setShowLoading] = useState(false);



  const limparFormulario = () => {
    setValor("");
    setValorSelect("");
    setValorAtor("");
    setImg("");
  };

  const cadastrarLivro = async (e) => {
    e.preventDefault();

    if (valor.trim().length === 0) {
      return Alerta({
        title: "Atenção",
        text: "O nome do livro não pode estar em branco.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    if (valorAtor.trim().length === 0) {
      return Alerta({
        title: "Atenção",
        text: "O autor não pode estar em branco.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    const formData = new FormData();
    formData.append("Titulo", valor);
    formData.append("Autor", valorAtor);
    formData.append("IdGenero", valorSelect);

    if (img) {
      formData.append("Imagem", img);
    }

    try {
      await api.post("/livro", formData);

      limparFormulario();
      getLivros();

      Alerta({
        title: "Sucesso",
        text: "Livro cadastrado com sucesso!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.data.errors);
      Alerta({
        title: "Erro",
        text: "Erro ao cadastrar livro!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const preEditar = (item) => {
    setValor(item.titulo);
    setValorSelect(item.idGenero);
    setValorAtor(item.autor);
    setImg(item.imagem);
    setIdEditar(item.id);
    setEditar(true);
  };

  const editarLivro = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Titulo", valor);
    formData.append("Autor", valorAtor);
    formData.append("IdGenero", valorSelect);

    if (img) {
      formData.append("Imagem", img);
    }

    try {
      await api.put(`/livro/${idEditar}`, formData);

      limparFormulario();
      getLivros();
      setEditar(false);

      Alerta({
        title: "Sucesso",
        text: "Livro editado com sucesso!",
        icon: "success",
      });
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("ERRO:", error);

      Alerta({
        title: "Erro",
        text: "Erro ao editar livro!",
        icon: "error",
      });
    }
  };

  const excluirLivro = async (item) => {
    const result = await Alerta({
      title: "Excluir Livro",
      text: `Tem certeza que deseja excluir o livro ${item.titulo}?`,
      icon: "warning",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/livro/${item.id}`);

      getLivros();
      limparFormulario();

      Alerta({
        title: "Excluído!",
        text: `O livro ${item.titulo} foi excluído com sucesso!`,
        icon: "success",
      });
    } catch (error) {
      console.log(error);

      Alerta({
        title: "Erro",
        text: "Erro ao excluir livro!",
        icon: "error",
      });
    }
  };

  const resumoDoLivro = async (livro) => {
    debugger;
    setShowLoading(true)
    try {
      const resumoIA = await gerarResumo(livro.titulo)
      setShowLoading(false)
      Alerta({
        title: `${livro.titulo}`,
        text: resumoIA,
        icon: "success",
        confirmButtonText: "Fechar",
      })
    } catch (error) {
      console.log("Deu ruim");
      console.log(error);

      setShowLoading(false);
    }
  }

  const getLivros = async () => {
    try {
      const retornoAPI = await api.get("/livro");
      setLista(retornoAPI.data);
    } catch (error) {
      console.log(error);

      Alerta({
        title: "Erro",
        text: "Erro ao buscar livros!",
        icon: "error",
      });
    }
  };

  const getGeneros = async () => {
    try {
      const retornoAPI = await api.get("/genero");
      setListaGeneros(retornoAPI.data);
    } catch (error) {
      console.log(error);

      Alerta({
        title: "Erro",
        text: "Erro ao buscar gêneros!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getLivros();
    getGeneros();
  }, []);

  const cancelarEdicao = () => {
    limparFormulario();
    setEditar(false);
  };

  return (
    <>
      <Header />

      <Cadastro
        tituloCadastro="Cadastro de livro"
        placeholder="livro"
        funcCadastro={editar ? editarLivro : cadastrarLivro}
        Editar={editar}
        valor={valor}
        setValor={setValor}
        valorSelect={valorSelect}
        setValorSelect={setValorSelect}
        valorAtor={valorAtor}
        setValorAtor={setValorAtor}
        listaGeneros={listaGeneros}
        setImg={setImg}
        cancelarEdicao={cancelarEdicao}
        funcEditar={preEditar}
        funcExcluir={excluirLivro}
      />

      <Lista
        tituloLista="Lista de livros"
        lista={lista}
        tipoLista="livro"
        funcEditar={preEditar}
        funcExcluir={excluirLivro}
        funcResumo={resumoDoLivro}

      />
      <Footer />
    </>
  );
};

export default CadastroLivro;
