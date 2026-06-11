using InPage.BdContextInPage;
using InPage.Interfaces;
using InPage.Models;
using Microsoft.AspNetCore.Mvc.Filters;

namespace InPage.Repositories
{
    public class GeneroRepository : IGeneroRepository
    {
        private readonly InPageContext _context;

        public GeneroRepository(InPageContext context)
        {
            _context = context;
        }

        public void AtualizarIdCorpo(Genero generoAtualizado)
        {
            try
            {
                Genero generoBuscado = _context.Generos.Find(generoAtualizado.Id)!;
                if (generoBuscado != null)
                {
                    generoBuscado.Nome = generoAtualizado.Nome;
                }
                _context.Generos.Update(generoBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void AtualizarIdUrl(Guid id, Genero generoAtualizado)
        {
            try
            {
                Genero generoBuscado = _context.Generos.Find(id.ToString())!;

                if (generoBuscado != null)
                {
                    generoBuscado.Nome = generoAtualizado.Nome;
                }
                _context.Generos.Update(generoBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public Genero BuscarPorId(Guid id)
        {
            try
            {
                Genero generoBuscado = _context.Generos.Find(id.ToString())!;
                return generoBuscado;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Genero novoGenero)
        {
            try
            {
                novoGenero.Id = Guid.NewGuid().ToString();

                _context.Generos.Add(novoGenero);

                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Genero generoBuscado = _context.Generos.Find(id.ToString())!;

                if (generoBuscado != null)
                {
                    _context.Generos.Remove(generoBuscado);
                }
                _context.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Genero> Listar()
        {
            try
            {
                List<Genero> listaGeneros =
                    _context.Generos.ToList();
                return listaGeneros;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
