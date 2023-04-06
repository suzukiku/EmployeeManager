using coreAPI.Repository;
using Microsoft.EntityFrameworkCore;
using Project3.Model;

namespace coreAPI.Service
{
  public class UserService : SqlRepository<User, string, SqlDatabaseContext, Services>
    {
        public UserService(ILogger logger, Services services, SqlDatabaseContext dbContext)
            : base(logger, dbContext, dbContext.Users, services)
        {

        }

        /// <summary>
        /// Getting all the users filtered by a string
        /// </summary>
        /// <param name="filterBy">The filter string</param>
        /// <returns>The users that contain the filter string in their usernames</returns>
        public IEnumerable<User> GetUsersFiltered(string filterBy)
        {
            Logger.LogInformation($"Getting users filtered by {filterBy}");
            return DbSet.Where(i => i.UserName.Contains(filterBy));
        }

    public User GetByUsername(string username)
    {
      return DbSet.Include(u => u.Employee).Where(u => u.UserName == username).First();
    }
  }
}
