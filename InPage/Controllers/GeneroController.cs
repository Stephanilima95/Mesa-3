using InPage.Interfaces;
using InPage.Models;
using InPage.WebAPI.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InPage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneroController : ControllerBase
    {
        private readonly IGeneroRepository _generoRepository;

        public GeneroController(IGeneroRepository generoRepository)
        {
            _generoRepository = generoRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_generoRepository.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]

        public IActionResult GetById(Guid id)
        {
            try { return Ok(_generoRepository.BuscarPorId(id)); }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Post(GeneroDTO dto)
        {
            try
            {
                Genero novoGenero = new Genero
                {
                    Id = Guid.NewGuid().ToString(), // ou outro gerador
                    Nome = dto.Nome!
                };

                _generoRepository.Cadastrar(novoGenero);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, Genero generoAtualizado)
        {
            try
            {
                _generoRepository.AtualizarIdUrl(id, generoAtualizado);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IActionResult PutBody(Genero generoAtualizado)
        {
            try
            {
                _generoRepository.AtualizarIdCorpo(generoAtualizado);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _generoRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
