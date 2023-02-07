using System.ComponentModel.DataAnnotations;

namespace Project3.Model.DTO
{
    public class WorkHoursDTO
    {
        public Guid WorkHoursId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public Guid EmployeeID { get; set; }
    }
}
