using System.ComponentModel.DataAnnotations;

namespace Project3.Model.DTO
{
    public class EmployeeDTO
    {
        public Guid? EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
    }
}
