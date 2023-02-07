using coreAPI.Repository;
using coreAPI.Service;
using Microsoft.EntityFrameworkCore;
using Project3.Model;

namespace Project3.Service
{
    public class TimeManagerService : SqlRepository<TimeManager, Guid, SqlDatabaseContext, Services>
    {
        public TimeManagerService(ILogger logger, Services services, SqlDatabaseContext dbContext)
            : base(logger, dbContext, dbContext.TimeManager, services)
        {
        }

        public IEnumerable<TimeManager> GetTimeManagersByEmployee(Guid employeeId)
        {
            return DbSet.Where(tm => tm.Employee.EmployeeID == employeeId);
        }
    }
}
