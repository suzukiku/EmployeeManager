using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using Project3.Model;
using Project3.Model.DTO;
using System.Data;
using System.Security.Cryptography.X509Certificates;

namespace Project3.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class WorkHoursController : BaseApiController
    {
        public WorkHoursController(ILogger<WorkHoursController> logger)
            : base(logger)
        {
            this._logger = logger;
        }

        private readonly ILogger _logger;

        [HttpGet("(WorkHoursID)")]
        public IActionResult Get(Guid WorkHoursID)
        {
            try
            {
                var workhours = Services.WorkHoursService.GetById(WorkHoursID);
                return Ok(workhours);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPost]
        public IActionResult Post(WorkHoursDTO workhoursDTO)
        {
            var workhours = new WorkHours()
            {
                WorkHoursID = workhoursDTO.WorkHoursId,
                CheckInDate = workhoursDTO.CheckInDate,
                CheckOutDate = null,
                Employee = Services.EmployeeService.GetById(workhoursDTO.EmployeeID)
            };

            Services.WorkHoursService.Add(workhours);
            return NoContent();


        }

        [HttpPatch]
        public IActionResult Patch(WorkHoursDTO workHoursDTO)
        {
            try
            {
                var workhours = Services.WorkHoursService.GetById(workHoursDTO.WorkHoursId);
                workhours.CheckOutDate = DateTime.Now;
                Services.WorkHoursService.Update(workhours);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}