using InPage.BdContextInPage;
using InPage.Interfaces;
using InPage.Models;
using Microsoft.EntityFrameworkCore;

namespace InPage.Repositories
{
    public class LivroRepository : ILivroRepository
    {
        private readonly InPageContext _context;

        public LivroRepository(InPageContext context)
        {
            _context = context;
        }
        
        public void AtualizarIdCorpo(Livro livroAtualizado)
        {
            try
            {
                Livro livroBuscado = _context.Livros.Find(livroAtualizado.Id)!;
                if (livroBuscado != null)
                {
                    livroBuscado.Titulo = livroAtualizado.Titulo;
                    livroBuscado.Autor = livroAtualizado.Autor;
                    livroBuscado.Imagem = livroAtualizado?.Imagem;
                    livroBuscado.IdGenero = livroAtualizado!.IdGenero;
                }
                _context.Livros.Update(livroBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AtualizarIdUrl(Guid id, Livro livroAtualizado)
        {
            try
            {
                Livro livroBuscado = _context.Livros.Find(id.ToString())!;
                if (livroBuscado != null)
                {
                    livroBuscado.Titulo = livroAtualizado.Titulo;
                    livroBuscado.Autor = livroAtualizado.Autor;
                    livroBuscado.Imagem = livroAtualizado?.Imagem;
                    livroBuscado.IdGenero = livroAtualizado!.IdGenero;
                }
                _context.Livros.Update(livroBuscado!);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Livro BuscarPorId(Guid id)
        {
            try
            {
                Livro livroBuscado = _context.Livros.Include(f => f.IdGeneroNavigation).FirstOrDefault(f => f.Id == id.ToString())!;
                return livroBuscado;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Cadastrar(Livro novoLivro)
        {
            try
            {
                novoLivro.Id = Guid.NewGuid().ToString();
                _context.Livros.Add(novoLivro);
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
                Livro livroBuscado = _context.Livros.Find(id.ToString())!;
                if(livroBuscado != null)
                {
                    _context.Livros.Remove(livroBuscado);
                }
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Livro> Listar()
        {
            try
            {
                List<Livro> listaLivros = _context.Livros
                .Include(f => f.IdGeneroNavigation)
                .ToList();
                return listaLivros;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
