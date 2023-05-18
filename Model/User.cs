using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Project3.Model
{
  public class User : IdentityUser
  {
    [Required, MaxLength(320)]
    public override string UserName { get => base.UserName; set => base.UserName = value; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    public bool IsAdmin { get; set; }
        public virtual Employee Employee { get; set; }

    public virtual ICollection<Skill> Skills { get; set; }
    }
}
