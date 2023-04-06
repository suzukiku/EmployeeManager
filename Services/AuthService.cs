using coreAPI.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Project3.Model;

namespace coreAPI.Service
{
    public class AuthService
    {
        public AuthService(ILogger logger, UserManager<User> userManager)
        {
            _userManager = userManager;
            _logger = logger;
        }

        private readonly ILogger _logger;
        private readonly UserManager<User> _userManager;

        /// <summary>
        /// Getting user by username
        /// </summary>
        /// <param name="username">The username to search</param>
        /// <returns>The user found by that username</returns>
        public async Task<User> GetUserByUsername(string username)
        {
            _logger.LogInformation($"Finding user by {username}");
            var user = await _userManager.FindByNameAsync(username);
            return user;
        }
        
        /// <summary>
        /// Logging in user
        /// </summary>
        /// <param name="username">The username</param>
        /// <param name="password">The password</param>
        /// <returns>The token generated and user model</returns>
        public async Task<TokenResponse> LoginUser(string username, string password)
        {
            _logger.LogInformation($"Logging user with username {username}");
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return null;
            }
            var correctPassword = await _userManager.CheckPasswordAsync(user, password);
            return !correctPassword ? null : LoginUserToken(user);
        }

        /// <summary>
        /// Registering a new user
        /// </summary>
        /// <param name="username">The username</param>
        /// <param name="email">The email</param>
        /// <param name="password">The password</param>
        /// <param name="samlId">The samlId</param>
        /// <param name="isAdmin">If the newly registered is an admin</param>
        /// <param name="isPublisher">If the newly registered is a publisher</param>
        /// <returns>The result of an identity operation and if it failed or not</returns>
        public Task<IdentityResult> Register(string username,
            string firstname,
            string lastname,
            string email,
            string password = "",
            bool isAdmin = false)
        {
            _logger.LogInformation($"Registering user with username {username}");
            var user = new User()
            {
                UserName = username,
                FirstName = firstname,
                LastName = lastname,
                Email = email,
                EmailConfirmed = false,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnd = DateTimeOffset.MaxValue,
                LockoutEnabled = true,
                IsAdmin = isAdmin,
                AccessFailedCount = 0,
            };
            var result = string.IsNullOrEmpty(password) ? _userManager.CreateAsync(user) : _userManager.CreateAsync(user, password);

            return result;
        }

        /// <summary>
        /// Editing the user
        /// </summary>
        /// <param name="id">The user id</param>
        /// <param name="username">The username</param>
        /// <param name="email">The email</param>
        /// <param name="isAdmin">If the user will be an admin</param>
        /// <param name="isPublisher">If the user will be a publisher</param>
        /// <returns>The result of an identity operation and if it failed or not</returns>
        public async Task<IdentityResult> Edit(Guid id,
            string username,
            string firstName,
            string lastName,
            string email,
            bool isAdmin)
        {
            _logger.LogInformation($"Editing user with id {id}");
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return null;
            }
            user.UserName = username;
            user.FirstName = firstName;
            user.LastName = lastName;
            user.Email = email;
            user.IsAdmin = isAdmin;
            var result = await _userManager.UpdateAsync(user);
            return result;
        }

        /// <summary>
        /// Deleting by id
        /// </summary>
        /// <param name="id">The user id</param>
        public void DeleteById(string id)
        {
            _logger.LogInformation($"Deleting user with id {id}");
            var user = _userManager.FindByIdAsync(id).GetAwaiter().GetResult();
            _userManager.DeleteAsync(user).GetAwaiter().GetResult();
        }

        /// <summary>
        /// Getting the uer by id
        /// </summary>
        /// <param name="id">The user id</param>
        /// <returns>The found user</returns>
        public User GetById(string id)
        {
            _logger.LogInformation($"Getting user by id {id}");
            //var user = _userManager.FindByIdAsync(id).GetAwaiter().GetResult();
            using var context = SqlDatabaseContext.Create();
            var services = new Services(_logger, context);
            var user = services.UserService.DbSet
                .FirstOrDefault(i => i.Id.Equals(id));
            return user;
        }

        /// <summary>
        /// Generating the token
        /// </summary>
        /// <param name="user">The user to whom the generated token is</param>
        /// <returns>The generated token alongside the user model</returns>
        private static TokenResponse LoginUserToken(User user)
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            var configuration = builder.Build();
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var claims = new List<Claim>
            {
                new("UserID", user.Id),
                new(ClaimTypes.Role, GetRole()),
            };

            var token = new JwtSecurityToken(
                configuration["JWT:ValidIssuer"],
                configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddMinutes(1000),
                claims: claims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new TokenResponse
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresIn = (int)token.ValidTo.Subtract(DateTime.UtcNow).TotalSeconds,
                TokenType = "bearer"
            };

            string GetRole()
            {
                if (user.IsAdmin)
                {
                    return "Admin";
                }

                return "User";
            }
        }
    }

    public class TokenResponse
    {
        public string AccessToken { get; set; }
        public long ExpiresIn { get; set; }
        public string TokenType { get; set; }
    }
}
