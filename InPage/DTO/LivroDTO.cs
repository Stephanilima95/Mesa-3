namespace InPage.WebAPI.DTO;

public class LivroDTO
{
    public string? Titulo { get; set; }
    public IFormFile? Imagem { get; set; }
    public string? Autor {  get; set; }

    public Guid IdGenero { get; set; }
}
