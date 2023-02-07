using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using Project3.Model;
using Project3.Model.DTO;
using System.Security.Cryptography.X509Certificates;

namespace Project3.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BreakTimeController : BaseApiController
    {
        public BreakTimeController(ILogger<BreakTimeController> logger)
            : base(logger)
        {
            this._logger = logger;
        }

        private readonly ILogger _logger;

        [HttpGet("(BreakTimeID)")]
        public IActionResult Get(Guid BreakTimeID)
        {
            try
            {
                var breaktime = Services.BreakTimeService.GetById(BreakTimeID);
                return Ok(breaktime);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPost]
        public IActionResult Post(BreakTimeDTO breaktimeDTO)
        {

            var breaktime = new BreakTime()
            {
                BreakTimeID = breaktimeDTO.BreakTimeID,
                BreakTimeStart = DateTime.Now,
                BreakTimeEnd = null,
                Employee = Services.EmployeeService.GetById(breaktimeDTO.EmployeeID)

            };

            Services.BreakTimeService.Add(breaktime);
            return NoContent();


        }

        [HttpPatch]
        public IActionResult Patch(BreakTimeDTO breakTimeDTO)
        {
            try
            {
                var breaktime = Services.BreakTimeService.GetById(breakTimeDTO.BreakTimeID);
                breaktime.BreakTimeEnd = DateTime.Now;
                Services.BreakTimeService.Update(breaktime);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}