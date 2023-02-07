using Microsoft.AspNetCore.Mvc;
using Project3.Model.DTO;
using Project3.Model;
using Project3.Model.Response;
using Microsoft.AspNetCore.Authorization;

namespace Project3.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class TimeManagerController : BaseApiController
    {
        public TimeManagerController(ILogger<TimeManagerController> logger)
            : base(logger)
        {
            this._logger = logger;
        }

        private readonly ILogger _logger;

        [HttpGet("(TimeManagerID)")]
        public IActionResult Get(Guid TimeManagerID)
        {
            try
            {
                var TimeManager = Services.TimeManagerService.GetById(TimeManagerID);
                return Ok(TimeManager);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var TimeManager = Services.TimeManagerService.GetDbSetAsEnumerable();
                return Ok(TimeManager);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpGet("byEmployee/{employeeId}")]
        public IActionResult GetByEmployeeId(Guid employeeId)
        {
            try
            {
                var TimeManager = Services.TimeManagerService.GetTimeManagersByEmployee(employeeId);
                return Ok(TimeManager);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPost]
        public IActionResult Post(TimeManagerDTO TimeManagerDTO)
        {
            var TimeManager = new TimeManager()
            {
                TimeStamp = TimeManagerDTO.TimeStamp,
                WorkHours = TimeManagerDTO.WorkHours,
                BreakTime = TimeManagerDTO.BreakTime,
                Employee = Services.EmployeeService.GetById(TimeManagerDTO.EmployeeID)
            };

            Services.TimeManagerService.Add(TimeManager);
            return NoContent();


        }

        [HttpDelete("{timemanagerID}")]
        public IActionResult Delete(Guid timemanagerID)
        {
            var timemanager = Services.TimeManagerService.GetById(timemanagerID);

            if (timemanager == null)
                return NotFound(new ResponseBase()
                {
                    Message = "timemmanager with id " + timemanagerID + "could not be found! "
                });
            else
            {
                Services.TimeManagerService.Remove(timemanager);
                return Ok(new ResponseBase()
                {
                    Message = "timemanager " + timemanagerID + " has been deleted!"
                });
            }
        }
    }
}

            //var sumhours = Services.TimeManagerService.GetTimeManagersByEmployee(employeeId).Select(x => x.WorkHours).Sum();