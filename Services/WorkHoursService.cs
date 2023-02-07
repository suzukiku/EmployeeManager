using coreAPI.Repository;
using Project3.Model;

namespace coreAPI.Service
{
    public class WorkHoursService : SqlRepository<WorkHours, Guid, SqlDatabaseContext, Services>
    {
        public WorkHoursService(ILogger logger, Services services, SqlDatabaseContext dbContext)
            : base(logger, dbContext, dbContext.WorkHours, services)
        {
        }
    }
}
