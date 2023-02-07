using System.ComponentModel.DataAnnotations;

namespace Project3.Model.DTO
{
    public class BreakTimeDTO
    {
        public Guid BreakTimeID { get; set; }
        public DateTime BreakTimeStart { get; set; }
        public DateTime BreakTimeEnd { get; set; }
        public Guid EmployeeID { get; set; } 
    }
}
