using coreAPI.Repository;
using coreAPI.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Project3.Controllers
{
    public class BaseApiController : ControllerBase
    {
        private readonly ILogger _logger;
        private Services _services;
        private SqlDatabaseContext _dbContext;
        protected SqlDatabaseContext DbContext => _dbContext ??= SqlDatabaseContext.Create();
        protected Services Services => _services ??= new Services(_logger, DbContext);

        public BaseApiController(ILogger logger)
        {
            _logger = logger;
        }

    }
}
