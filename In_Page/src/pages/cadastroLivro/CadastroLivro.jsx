import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroLivro = () => {
  return <>  
         <Cadastro
           tituloCadastro="Cadastro de livro"
           placeholder="livro"
           funcCadastro={console.log}
           Editar={false}
           valor=""
           setValor={console.log}
           valorSelect=""
           setValorSelect={console.log}
           valorAtor=""
           setValorAtor={console.log}
           listaGeneros={[]}
           setImg={console.log}
           cancelarEdicao={console.log}
           
         />;
         <Lista
           tituloLista="Lista de livros"
           lista={[]}
           funcEditar={console.log}
           funcExcluir={console.log}
           funcResumo={console.log}
           tipoLista="livro"

         />
         </>
};

export default CadastroLivro;