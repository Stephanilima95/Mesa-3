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
            if (String.IsNullOrWhiteSpace(livro.Nome))
                return BadRequest("É Obrigatório que o Livro tenha Nome e Gênero");

            Livro novoLivro = new livro();

            if (livro.Imagem != null && livro.Imagem.Length > 0)
            {
                var extensao = Path.GetExtension(livro.Imagem.FileName);
                var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

                var pastaRelativa = "wwwroot/imagens";
                var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

                //Garante que a pasta exista
                if (!Directory.Exists(caminhoPasta))
                    Directory.CreateDirectory(caminhoPasta);

                var caminhoCompleto = Path.Combine(caminhoPasta, nomeArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await livro.Imagem.CopyToAsync(stream);
                }

                novoLivro.Imagem = nomeArquivo;
            }

            novoLivro.IdGenero = livro.IdGenero.ToString();
            novoLivro.Titulo = livro.Titulo!;


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
        public async Task<IActionResult> Put(Guid id, LivroDTO LivroAtualizado)
        {

            var LivroBuscado = _livroRepository.BuscarPorId(id);
            if (LivroBuscado == null)
                return NotFound("Livro não encontrado!");

            if (!String.IsNullOrWhiteSpace(LivroAtualizado.Nome))
                LivroBuscado.Titulo = LivroAtualizado.Nome;

            if (LivroAtualizado.IdGenero != null && LivroBuscado.IdGenero != LivroAtualizado.IdGenero.ToString())
                LivroBuscado.IdGenero = LivroAtualizado.IdGenero.ToString();

            if (LivroAtualizado.Imagem != null && LivroAtualizado.Imagem.Length != 0)
            {
                var pastaRelativa = "wwwroot/imagens";
                var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);
                //Deleta arquivo antigo
                if (!String.IsNullOrEmpty(LivroBuscado.Imagem))
                {
                    var caminhoAntigo = Path.Combine(caminhoPasta, LivroBuscado.Imagem);
                    if (System.IO.File.Exists(caminhoAntigo))
                        System.IO.File.Delete(caminhoAntigo);
                }

                //Salva a nova imagem
                var extensao = Path.GetExtension(LivroAtualizado.Imagem.FileName);
                var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

                if (!Directory.Exists(caminhoPasta))
                    Directory.CreateDirectory(caminhoPasta);

                var caminhoCompleto = Path.Combine(caminhoPasta, nomeArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await LivroAtualizado.Imagem.CopyToAsync(stream);
                }

                LivroBuscado.Imagem = nomeArquivo;
            }

            try
            {
                _livroRepository.AtualizarIdUrl(id, LivroBuscado);
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(Livro LivroAtualizado)
        {
            try
            {
                _livroRepository.AtualizarIdCorpo(LivroAtualizado);
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

            var LivroBuscado = _livroRepository.BuscarPorId(id);
            if (LivroBuscado == null)
                return NotFound("Livro não encontrado.");

            var pastaRelativa = "wwwroot/imagens";
            var caminhoPasta = Path.Combine(Directory.GetCurrentDirectory(), pastaRelativa);

            //Deleta o arquivo
            if (!String.IsNullOrEmpty(LivroBuscado.Imagem))
            {
                var caminho = Path.Combine(caminhoPasta, LivroBuscado.Imagem);

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
