using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace InPage.Models;

[Table("Livro")]
public partial class Livro
{
    [Key]
    [StringLength(40)]
    [Unicode(false)]
    public string Id { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Titulo { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Autor { get; set; } = null!;

    [StringLength(40)]
    [Unicode(false)]
    public string? IdGenero { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Imagem { get; set; }

    [ForeignKey("IdGenero")]
    [InverseProperty("Livros")]
    public virtual Genero? IdGeneroNavigation { get; set; }
}
