using coreAPI.Repository;
using coreAPI.Service;
using Microsoft.EntityFrameworkCore;
using Project3.Model;
using Project3.Model.DTO;

namespace coreAPI.Service
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
        public TimeManagerResult CalculateTotalWorkHoursAndBreakTime(IEnumerable<TimeManager> timeManagers, DateTime start, DateTime end)
        {
          var result = timeManagers
              .Where(tm => tm.TimeStamp >= start && tm.TimeStamp <= end)
              .Aggregate(new TimeManagerResult { WorkHours = TimeSpan.Zero, BreakTime = TimeSpan.Zero }, (acc, tm) => {
                TimeSpan workHours = TimeSpan.TryParse(tm.WorkHours, out TimeSpan parsedWorkHours) ? parsedWorkHours : TimeSpan.Zero;
                TimeSpan breakTime = TimeSpan.TryParse(tm.BreakTime, out TimeSpan parsedBreakTime) ? parsedBreakTime : TimeSpan.Zero;

                acc.WorkHours += workHours;
                acc.BreakTime += breakTime;
                return acc;
              });

          return result;
        }
  } 
}
