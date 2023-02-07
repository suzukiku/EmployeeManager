using coreAPI.Repository;
using Microsoft.EntityFrameworkCore;
using Project3.Model;
using Project3.Model.DTO;

namespace coreAPI.Service
{
    public class EmployeeService : SqlRepository<Employee, Guid, SqlDatabaseContext, Services>
    {
        public EmployeeService(ILogger logger, Services services, SqlDatabaseContext dbContext)
            : base(logger, dbContext, dbContext.Employees, services)
        {
        }
        public void DeleteEmployee(Guid employeeID)
        {
            var employee = DbSet.Include(e => e.Breaktimes)
                .Include(e => e.WorkHours)
                .Where(e => e.EmployeeID == employeeID)
                .FirstOrDefault();

            if (employee is null)
            {
                return;
            }

            foreach(var breaktimes in employee.Breaktimes)
            {
                _services.BreakTimeService.Remove(breaktimes);
            }
            foreach (var workhours in employee.WorkHours)
            {
                _services.WorkHoursService.Remove(workhours);
            }
            Remove(employee);
        }

        public IEnumerable<Employee> GetAllItems()
        {
            return DbSet.Select(x => x);
        }

        internal Employee GetById(EmployeeDTO employeeID)
        {
            throw new NotImplementedException();
        }
    }
}
