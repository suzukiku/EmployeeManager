using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project3.Model
{
    [Table("BreakTime")]
    public class BreakTime
    {
        [Key]
        [ForeignKey("EmployeeID")]
        public Guid BreakTimeID { get; set; }

        [Required]
        public DateTime BreakTimeStart { get; set;}

        public DateTime? BreakTimeEnd { get; set;}

        public virtual Employee Employee { get; set; }

    }
}
