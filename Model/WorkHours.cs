using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project3.Model
{
    [Table("WorkHours")]
    public class WorkHours
    {
        [Key]
        [ForeignKey("EmployeeID")]
        public Guid WorkHoursID { get; set; }


        [Required]
        public DateTime CheckInDate { get; set; }
        public DateTime? CheckOutDate { get; set; }

        public virtual Employee Employee { get; set; }

    }
}
