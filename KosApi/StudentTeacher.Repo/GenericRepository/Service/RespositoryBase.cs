using Microsoft.EntityFrameworkCore;
using StudentTeacher.Core.Models;
using StudentTeacher.Repo.Data;
using StudentTeacher.Repo.GenericRepository.Interface;
using System.Linq.Expressions;

namespace StudentTeacher.Repo.GenericRepository.Service;

public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
{
    protected RepositoryContext RepositoryContext;
    public RepositoryBase(RepositoryContext repositoryContext) =>
        RepositoryContext = repositoryContext;

    public async Task<IQueryable<T>> FindAllAsync(bool trackChanges) =>
        !trackChanges ? await Task.Run(() => RepositoryContext.Set<T>().AsNoTracking()) : await Task.Run(() => RepositoryContext.Set<T>());

    public async Task<IQueryable<T>> FindByConditionAsync(Expression<Func<T, bool>> expression, bool trackChanges) =>
        !trackChanges ? await Task.Run(() => RepositoryContext.Set<T>().Where(expression).AsNoTracking()) : await Task.Run(() => RepositoryContext.Set<T>().Where(expression));

    public async Task CreateAsync(T entity) => await Task.Run(() => RepositoryContext.Set<T>().Add(entity));
    public async Task CreateRangeAsync(IEnumerable<T> entities)
    {
        RepositoryContext.Set<T>().AddRange(entities);
        await RepositoryContext.SaveChangesAsync();
    }


    public async Task UpdateAsync(T entity) => await Task.Run(() => RepositoryContext.Set<T>().Update(entity));
    public async Task RemoveAsync(T entity) => await Task.Run(() => RepositoryContext.Set<T>().Remove(entity));
}
