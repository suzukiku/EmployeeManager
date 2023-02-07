using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.Logging;

namespace coreAPI.Repository
{
    public class SqlRepository<TModel, TTypeId, TDbContext, TSer> : ISqlRepository<TModel, TTypeId>
        where TModel : class
        where TDbContext : DbContext
    {
        private readonly DbSet<TModel> _dbSet;
        private readonly TDbContext _dbContext;
        protected readonly TSer _services;
        protected readonly ILogger Logger;
        private string ClassName => typeof(TModel).Name;
        private string IdName => $"{ClassName}ID";
        private PropertyInfo IdProperty => typeof(TModel).GetProperty(IdName);

        protected SqlRepository(ILogger logger, TDbContext dbContext, DbSet<TModel> dbSet, TSer services)
        {
            _dbContext = dbContext;
            _dbSet = dbSet;
            _services = services;
            Logger = logger;
        }
        
        /// <summary>
        /// Getting all DB entries
        /// </summary>
        public DbSet<TModel> DbSet => _dbSet;

        /// <summary>
        /// Getting all DB entries as enumerable
        /// </summary>
        /// <returns>The enumerable</returns>
        public IEnumerable<TModel> GetDbSetAsEnumerable()
        {
            Logger.LogInformation("Repo Op...Getting the entries as enumerable");
            return DbSet.AsEnumerable();
        }

        /// <summary>
        /// Getting an entry by id
        /// </summary>
        /// <param name="id">The id</param>
        /// <returns>The model found in DB by id</returns>
        public virtual TModel GetById(TTypeId id)
        {
            Logger.LogInformation($"Repo Op...Getting model by id {id}");

            var queryString = $"SELECT * FROM [{ClassName}] WHERE [{IdName}] = '{id}' ";
            var query = _dbSet.FromSqlRaw(queryString);
            var entity = query.FirstOrDefault();

            return entity;
        }

        /// <summary>
        /// Adding a new model to DB
        /// </summary>
        /// <param name="model">The model to be added</param>
        /// <returns>The added entry</returns>
        public TModel Add(TModel model)
        {
            Logger.LogInformation("Repo Op...Adding new entry to db");
            var id = (TTypeId)IdProperty.GetValue(model);
            if (EqualityComparer<TTypeId>.Default.Equals(id, default(TTypeId)))
            {
                if (typeof(TTypeId) == typeof(Guid))
                {
                    id = (TTypeId)(object)Guid.NewGuid();
                    IdProperty.SetValue(model, id);
                }
            }

            _dbSet.Add(model);
            _dbContext.SaveChanges();

            return model;
        }

        /// <summary>
        /// Removing a model from DB
        /// </summary>
        /// <param name="model">The model to be removed</param>
        public void Remove(TModel model)
        {
            Logger.LogInformation("Repo Op...Removing entry from db");
            _dbSet.Remove(model);
            _dbContext.SaveChanges();
        }

        /// <summary>
        /// Removing a model from DB by id
        /// </summary>
        /// <param name="id">The id for the model</param>
        public void RemoveById(TTypeId id)
        {
            Logger.LogInformation($"Repo Op...Removing entry from db by id {id}");
            var entity = GetById(id);
            _dbSet.Remove(entity);
            _dbContext.SaveChanges();
        }

        /// <summary>
        /// Updating a model in DB
        /// </summary>
        /// <param name="model">The model to be updated</param>
        /// <returns>The updated model</returns>
        public TModel Update(TModel model)
        {
            Logger.LogInformation($"Repo Op...Updating entry from db");
            _dbContext.Update(model);
            _dbContext.SaveChanges();
            return model;
        }
    }
}
