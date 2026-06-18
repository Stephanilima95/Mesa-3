import Swal from "sweetalert2";
import Lista from "../../components/lista/Lista";
import "./CadastroGenero.css";
import { useEffect, useState } from "react";
import api from "../../services/services";
import Cadastro from "../../components/cadastro/Cadastro";
import { Alerta } from "../../components/alerta/Alerta";
import Header from "../../components/header/Header";

const CadastroGenero = () => {
  // const apiUrl = "https://localhost:7187/api/Genero";

  const [genero, setGenero] = useState("");
  const [editar, setEditar] = useState(false);
  const [valor, setValor] = useState("");
  const [listaGeneros, setListaGeneros] = useState([]);
  const [idEditar, setIdEditar] = useState("");

   const cadastrarGenero = async (e) => {
        e.preventDefault();

        if (valor.trim().length === 0) {
            Alerta({
                title: "Atenção",
                text: "O nome do gênero não pode estar em branco.",
                icon: "warning",
                confirmButtonText: "Ok",
            });
            return;
        }
        

        const objCadastro = {
            Nome: valor,
        };

        try {
            await api.post("/Genero", objCadastro);

            limparFormulario();
            getGeneros();

            Alerta({
                title: "Cadastro realizado com sucesso!",
                text: "O gênero foi cadastrado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("ERRO COMPLETO:", error);

            Alerta({
                title: "Erro na chamada da API",
                text: "Verifique os dados e tente novamente!",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };
  const limparFormulario = () => {
    setValor("");
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

 const excluirGenero = async (item) => {
        const result = await Alerta({
            title: "Excluir Gênero",
            text: `Tem certeza que deseja excluir o gênero ${item.nome}?`,
            icon: "warning",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            showCancelButton: true,
            confirmButtonColor: "#85f085ff",
            cancelButtonColor: "#ff6666ff",
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/Genero/${item.id}`);

            getGeneros();
            limparFormulario();

            Alerta({
                title: "Excluído!",
                text: `O gênero ${item.nome} foi excluído com sucesso!`,
                icon: "success",
                confirmButtonText: "Ok",
            });
        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("ERRO COMPLETO:", error);

            Alerta({
                title: "Erro",
                text: "Erro ao excluir gênero!",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

  const preEditar = (item) => {
        setValor(item.nome);
        setIdEditar(item.id);
        setEditar(true);
    };

    // PUT
    const editarGenero = async (e) => {
        e.preventDefault();

        const objCadastro = {
            id: idEditar,
            nome: valor,
        };

        try {
            await api.put(`/Genero/${idEditar}`, objCadastro);

            limparFormulario();
            getGeneros();

            Alerta({
                title: "Sucesso",
                text: "Gênero editado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok",
            });
        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("ERRO COMPLETO:", error);

            Alerta({
                title: "Erro na chamada da API",
                text: "Verifique os dados e tente novamente!",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };


  const getGeneros = async () => {
    try {
      const retornoAPI = await api.get("/genero"); // chama a api
      const dados = await retornoAPI.data; // extrai os dados retornados
      setListaGeneros(dados); // guarda os dados no state (já exibe na lista)
      console.log(retornoAPI.data);
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Erro",
        text: "Ocorreu um erro ao retornar os dados da API",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    // chamar os dados da api
    getGeneros();
  }, []);

  return (
    <>
    <Header />
      <Cadastro
      funcCadastro={editar ? editarGenero : cadastrarGenero}
      tituloCadastro="Cadastrar Gênero"
      placeholder="Gênero"
      valor={valor}
      setValor={setValor}
      Editar={editar}
      setEditar={setEditar}
      cancelarEdicao={cancelarEdicao}
      atualizar={atualizarGenero}
      visibilidade={"none"}
      funcEditar={preEditar}
      funcExcluir={excluirGenero}
      
      />

      <Lista
        tituloLista="Gênero de Livros"
        tipoLista="genero"
        lista={listaGeneros}
        // dunção que muda o state
        funcExcluir={excluirGenero}
        visibilidade={"none"}
        funcEditar={preEditar}
      />
      
    </>
  );
};

export default CadastroGenero;
