using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project3.Model
{
  [Table("Skills")]
  public class Skill
  {
  public int Id { get; set; }
  public string Name { get; set; }
  public Guid UserId { get; set; }
  public User User { get; set; }
  
  }
}
