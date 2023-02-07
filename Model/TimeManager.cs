using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project3.Model
{
    [Table("TimeManager")]
    public class TimeManager
    {
        [Key]
        public Guid TimeManagerID { get; set; }

        [Required]
        public DateTime TimeStamp { get; set; }
        [Required]
        public string WorkHours {  get; set; }
        [Required]
        public string BreakTime { get; set; } 

        public virtual Employee Employee { get; set; }

    }
}
