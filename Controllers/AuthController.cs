using Microsoft.AspNetCore.Identity;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project3.Controllers;
using Project3.Model;
using coreAPI.Service;
using coreAPI.Model.RequestModel;
using System.Security.Claims;

namespace coreAPI.Controller
{
    [ApiController]
    [Authorize]
    [Route("api/v1")]
    public class AuthController : BaseApiController
    {
        public AuthController(ILogger<AuthController> logger,
            UserManager<User> userManager)
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

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                _logger.LogDebug($"Trying to login with username {model.Username}");
                var tokenResponse = AuthService.LoginUser(model.Username, model.Password).Result;
                if (tokenResponse is null)
                {
                    _logger.LogInformation("Login failed");
                    return BadRequest("Invalid username or password");
                }
                _logger.LogInformation($"{model.Username} has successfully logged in");

               var user = AuthService.GetUserByUsername(model.Username);
               return Ok(new
               {
                 Token = tokenResponse,
                 User = AuthService.GetUserByUsername(model.Username).Result
               });
            }
            catch (Exception ex)
            {
                    _logger.LogTrace(ex, "Error on logging in user");
                    return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("checkToken")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public IActionResult CheckToken()
        {
            _logger.LogInformation($"{CurrentUser.UserName} has checked his token, and it is valid");
            return Ok(CurrentUser);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        [ProducesResponseType((int) HttpStatusCode.NoContent)]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        [ProducesResponseType((int) HttpStatusCode.Unauthorized)]
        [ProducesResponseType((int) HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            try
            {
                _logger.LogDebug($"Trying to register {model.UserName}");
                if (model.UserName is null)
                {
                    _logger.LogInformation($"Missing username when registering");
                    return BadRequest("Missing Username!");
                }

                if (model.Password is null)
                {
                    _logger.LogInformation($"Missing password when registering");
                    return BadRequest("Missing Password");
                }

                if (model.Email is null)
                {
                    _logger.LogInformation($"Missing Email when registering");
                    return BadRequest("Missing Email");
                }

                var result = await AuthService.Register(model.UserName, model.Email, model.Password);
                if (!result.Succeeded)
                {
                    var errors = "";
                    result.Errors.ToList().ForEach(i => errors += $"{i.Description}\n");
                    _logger.LogError($"Failed registering user; errors: {errors}");
                    return StatusCode(500, errors);
                }

                var user = await AuthService.GetUserByUsername(model.UserName);
                if (user == null)
                {
                    _logger.LogError("DB Error when registering");
                    return StatusCode(500, "DB Error");
                }
                _logger.LogInformation($"Successfully registered {model.UserName}");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogTrace(ex, "Error on registering user");
                return BadRequest(ex.Message);
            }
        }
    }
}
