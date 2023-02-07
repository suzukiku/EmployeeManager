using coreAPI.Repository;
using Project3.Model;

namespace coreAPI.Service
{
    public class BreakTimeService : SqlRepository<BreakTime, Guid, SqlDatabaseContext, Services>
    {
        public BreakTimeService(ILogger logger, Services services, SqlDatabaseContext dbContext)
            : base(logger, dbContext, dbContext.BreakTimes, services)
        {
        }
    }
}
