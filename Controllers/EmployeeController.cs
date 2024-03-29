using coreAPI.Controllers;
using coreAPI.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project3.Model;
using Project3.Model.DTO;
using Project3.Model.Response;
using System.Security.Claims;

namespace Project3.Controllers
{
  [ApiController]
  [Route("api/v1/[controller]")]
  public class EmployeeController : BaseApiController
  {



    public EmployeeController(ILogger<EmployeeController> logger, UserManager<User> userManager)
        : base(logger)
    {
      this._logger = logger;
      AuthService = new AuthService(_logger, userManager);
    }

    protected readonly AuthService AuthService;
    private User _currentUser;

    protected User CurrentUser
    {
      get
      {
        if (User.Identity is { IsAuthenticated: false })
        {
          return null;
        }

        if (_currentUser == null)
        {
          var userId = ((ClaimsIdentity)User.Identity).FindFirst("UserID");
          _currentUser = AuthService.GetById(userId.Value);
        }

        return _currentUser;
      }
    }

    private readonly ILogger _logger;

    [HttpGet("(EmployeeID)")]
    public IActionResult Get(Guid EmployeeID)
    {
      try
      {

        var employee = Services.EmployeeService.GetById(EmployeeID);
        if (employee == null)
          return NotFound("Employee does not exists!");
        return Ok(employee);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);

      }
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
      try
      {
        var employees = Services.EmployeeService.GetDbSetAsEnumerable();
        return Ok(employees);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);

      }
    }


    [HttpPost]
    public IActionResult Post(EmployeeDTO employeeDTO)
    {

      var employee = new Employee()
      {
        FirstName = employeeDTO.FirstName,
        LastName = employeeDTO.LastName,
        Email = employeeDTO.Email,
        UserId = employeeDTO.UserId
      };

      var existEmployee = Services.EmployeeService.GetAllItems().Where(x => x.Email == employeeDTO.Email).FirstOrDefault();
      if (existEmployee != null)
        return BadRequest("This email is already in use!");

      return Ok(Services.EmployeeService.Add(employee));



    }

    [HttpDelete("{employeeID}")]
    public IActionResult Delete(Guid employeeID)
    {
      var employee = Services.EmployeeService.GetById(employeeID);
      if (employee == null)
        return NotFound(new ResponseBase()
        {
          Message = "employee with id " + employeeID + "could not be found! "
        });
      else
      {
        Services.EmployeeService.DeleteEmployee(employeeID);
        return Ok(new ResponseBase()
        {
          Message = "Employee " + employee.FirstName + " has been deleted!"
        });
      }
    }

    [HttpPut]
    public IActionResult Put(EmployeeDTO employeeDTO)
    {

      var employee = Services.EmployeeService.GetById(employeeDTO.EmployeeID.Value);
      employee.FirstName = employeeDTO.FirstName;
      employee.LastName = employeeDTO.LastName;
      employee.Email = employeeDTO.Email;
      Services.EmployeeService.Update(employee);
      return NoContent();
    }

  }
}
