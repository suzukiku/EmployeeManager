using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project3.Model;
using System.IO;

namespace coreAPI.Repository
{
    public class SqlDatabaseContext : DbContext
    {
        public SqlDatabaseContext(DbContextOptions<SqlDatabaseContext> options)
            : base(options)
        {
        }  
        public virtual DbSet<BreakTime> BreakTimes { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<WorkHours> WorkHours { get; set; }

        public virtual DbSet<TimeManager> TimeManager { get; set; }

        public static SqlDatabaseContext Create()
        {
            bool isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(!isDevelopment ? "appsettings.json" : "appsettings.Development.json");
            var configuration = builder.Build();
            var optionsBuilder = new DbContextOptionsBuilder<SqlDatabaseContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            return new SqlDatabaseContext(optionsBuilder.Options);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder optionsBuilder)
            => optionsBuilder
                .Properties<string>().HaveMaxLength(256);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
