using InPage.BdContextInPage;
using InPage.Models;
using InPage.Utils;
using Microsoft.AspNetCore.Mvc.Filters;

namespace InPage.Repositories;

public class UsuarioRepository
{
    private readonly InPageContext _context;

    public UsuarioRepository(InPageContext context)
    {
        _context = context;
    }
    public Usuario BuscarPorEmaileSenha(string email, string senha)
    {
        try
        {
            Usuario usuarioBuscado = _context.Usuarios.FirstOrDefault(u => u.Email == email)!;
            if (usuarioBuscado != null)
            {
                bool confere = Criptografia.CompararHash(senha, usuarioBuscado.Senha!);
                if (confere)
                {
                    return usuarioBuscado;
                }
            }

            return null!;
        }
        catch (Exception)
        {

            throw;
        }
    }

    public Usuario BuscarPorId(Guid id)
    {
        try
        {
            Usuario usuarioBuscado = _context.Usuarios.Find(id.ToString())!;
            if (usuarioBuscado != null)
            {
                return usuarioBuscado;
            }
            return null!;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public void Cadastrar(Usuario novoUsuario)
    {
        try
        {
            novoUsuario.IdUsuario = Guid.NewGuid().ToString();
            novoUsuario.Senha = Criptografia.GerarHash(novoUsuario.Senha)!;
            _context.Usuarios.Add(novoUsuario);
            _context.SaveChanges();
        }
        catch (Exception)
        {
            throw;
        }
    }
}
