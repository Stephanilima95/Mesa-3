using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace InPage.Models;

[Table("Genero")]
public partial class Genero
{
    [Key]
    [StringLength(40)]
    [Unicode(false)]
    public string Id { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string Nome { get; set; } = null!;

    [InverseProperty("IdGeneroNavigation")]
    public virtual ICollection<Livro> Livros { get; set; } = new List<Livro>();
}
