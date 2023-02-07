
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project3.Model
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        public Guid EmployeeID { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }

        public virtual ICollection<BreakTime> Breaktimes{ get; set; }

        public virtual ICollection<WorkHours> WorkHours{ get; set; }

        public virtual ICollection<TimeManager> TimeManager { get; set; }
    }
}
