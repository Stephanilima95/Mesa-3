using InPage.Models;
using static System.Net.WebRequestMethods;

namespace InPage.Interfaces;

public interface ILivroRepository
{
    void Cadastrar(Livro novoLivro);
    void AtualizarIdCorpo(Livro livroAtualizado);
    void AtualizarIdUrl(Guid id, Livro livroAtualizado);
    List<Livro> Listar();
    void Deletar(Guid id);
    Livro BuscarPorId(Guid id);
}
