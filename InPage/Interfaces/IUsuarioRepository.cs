using InPage.Models;

namespace InPage.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario novoUsuario);

        Usuario BuscarPorId(Guid id);

        Usuario BuscarPorEmaileSenha(string email, string senha);
    }
}
