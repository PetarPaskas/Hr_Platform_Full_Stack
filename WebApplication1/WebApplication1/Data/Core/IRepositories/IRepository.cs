using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace WebApplication1.Data.Core.IRepositories
{
    public interface IRepository<TEntity> where TEntity:class
    {
        void Add(TEntity entity);
        void AddRange(ICollection<TEntity> entities);
       
        void Remove(TEntity entity);
        void RemoveRange(ICollection<TEntity> entities);

        ICollection<TEntity> GetAll();
        TEntity Get(int id);

        TEntity GetSingleOrNull(Expression<Func<TEntity, bool>> predicate);
        ICollection<TEntity> Find(Expression<Func<TEntity, bool>> predicate);
    }
}
