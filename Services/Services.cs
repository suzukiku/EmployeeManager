using System;
using coreAPI.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Project3.Service;

namespace coreAPI.Service
{
    public class Services
    {
        public Services(ILogger logger, SqlDatabaseContext databaseContext)
        {
            DatabaseContext = databaseContext;
            _logger = logger;
        }

        private WorkHoursService _workHoursService;
        private BreakTimeService _breakTimeService;
        private EmployeeService _employeeService;
        private TimeManagerService _timeManagerService;

        public WorkHoursService WorkHoursService => _workHoursService ??= new WorkHoursService(_logger, this, DatabaseContext);
        public BreakTimeService BreakTimeService => _breakTimeService  ??= new BreakTimeService(_logger, this, DatabaseContext);
        public EmployeeService EmployeeService => _employeeService ??= new EmployeeService(_logger, this, DatabaseContext);

        public TimeManagerService TimeManagerService => _timeManagerService ??= new TimeManagerService(_logger, this, DatabaseContext);

        private readonly ILogger _logger;
        private SqlDatabaseContext DatabaseContext { get; }
        public void InNewContext(ILogger logger, Action<Services> action)
        {
            using var context = SqlDatabaseContext.Create();
            action(new Services(logger, context));
        }
        


    }
}
