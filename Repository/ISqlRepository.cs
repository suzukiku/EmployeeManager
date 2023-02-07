using Microsoft.EntityFrameworkCore;

namespace coreAPI.Repository
{
    public interface ISqlRepository<T, TTypeId> where T : class
    {
        DbSet<T> DbSet { get; }
        T Add(T model);
        T Update(T model);
        void Remove(T model);
    }
}
