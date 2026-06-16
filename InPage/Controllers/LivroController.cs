using InPage.Interfaces;
using InPage.Models;
using InPage.WebAPI.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.WebRequestMethods;

namespace InPage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LivroController : ControllerBase
    {
        private readonly ILivroRepository _livroRepository;

        public LivroController(ILivroRepository livroRepository)
        {
            _livroRepository = livroRepository;
        }
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(_livroRepository.BuscarPorId(id));
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }
        // [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_livroRepository.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] LivroDTO livro)
        {
            if (String.IsNullOrWhiteSpace(livro.Titulo))
                return BadRequest("É Obrigatório que o Livro tenha Titulo e Gênero");

            Livro novoLivro = new Livro();

            if (livro.Imagem != null && livro.Imagem.Length > 0)
            {
                var extensao = Path.GetExtension(livro.Imagem.FileName);
                var TituloArquivo = $"{Guid.NewGuid()}{extensao}";

                var pastaRelativa = "wwwroot/imagens";
                var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

                //Garante que a pasta exista
                if (!Directory.Exists(caminhoPasta))
                    Directory.CreateDirectory(caminhoPasta);

                var caminhoCompleto = Path.Combine(caminhoPasta, TituloArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await livro.Imagem.CopyToAsync(stream);
                }

                novoLivro.Imagem = TituloArquivo;
            }

            novoLivro.IdGenero = livro.IdGenero.ToString();
            novoLivro.Titulo = livro.Titulo!;
            novoLivro.Autor = livro.Autor!;


            try
            {
                _livroRepository.Cadastrar(novoLivro);
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, LivroDTO livroAtualizado)
        {

            var livroBuscado = _livroRepository.BuscarPorId(id);
            if (livroBuscado == null)
                return NotFound("Livro não encontrado!");

            if (!String.IsNullOrWhiteSpace(livroAtualizado.Titulo))
                livroBuscado.Titulo = livroAtualizado.Titulo;

            if (livroAtualizado.IdGenero != null && livroBuscado.IdGenero != livroAtualizado.IdGenero.ToString())
                livroBuscado.IdGenero = livroAtualizado.IdGenero.ToString();

            if (!String.IsNullOrWhiteSpace(livroAtualizado.Autor))
                livroBuscado.Autor = livroAtualizado.Autor;

            if (livroAtualizado.Imagem != null && livroAtualizado.Imagem.Length != 0)
            {
                var pastaRelativa = "wwwroot/imagens";
                var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);
                //Deleta arquivo antigo
                if (!String.IsNullOrEmpty(livroBuscado.Imagem))
                {
                    var caminhoAntigo = Path.Combine(caminhoPasta, livroBuscado.Imagem);
                    if (System.IO.File.Exists(caminhoAntigo))
                        System.IO.File.Delete(caminhoAntigo);
                }

                //Salva a nova imagem
                var extensao = Path.GetExtension(livroAtualizado.Imagem.FileName);
                var TituloArquivo = $"{Guid.NewGuid()}{extensao}";

                if (!Directory.Exists(caminhoPasta))
                    Directory.CreateDirectory(caminhoPasta);

                var caminhoCompleto = Path.Combine(caminhoPasta, TituloArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await livroAtualizado.Imagem.CopyToAsync(stream);
                }

                livroBuscado.Imagem = TituloArquivo;
            }

            try
            {
                _livroRepository.AtualizarIdUrl(id, livroBuscado);
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(Livro livroAtualizado)
        {
            try
            {
                _livroRepository.AtualizarIdCorpo(livroAtualizado);
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {

            var livroBuscado = _livroRepository.BuscarPorId(id);
            if (livroBuscado == null)
                return NotFound("Livro não encontrado.");

            var pastaRelativa = "wwwroot/imagens";
            var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

            //Deleta o arquivo
            if (!String.IsNullOrEmpty(livroBuscado.Imagem))
            {
                var caminho = Path.Combine(caminhoPasta, livroBuscado.Imagem);

                if (System.IO.File.Exists(caminho))
                    System.IO.File.Delete(caminho);
            }
            try
            {
                _livroRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
