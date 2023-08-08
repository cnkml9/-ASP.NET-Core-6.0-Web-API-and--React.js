using Microsoft.EntityFrameworkCore;
using StudentTeacher.Core.Models;
using StudentTeacher.Repo.Data;
using StudentTeacher.Repo.GenericRepository.Service;
using StudentTeacher.Service.Interfaces;
using System.Xml.Linq;

namespace StudentTeacher.Service.Services
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<Customer>> GetAllCustomer(bool trackChanges)
        => await FindAllAsync(trackChanges).Result.OrderBy(c => c.CompanyName).ToListAsync();

        public async Task CreateCustomer(Customer customer) => await CreateAsync(customer);
        public async Task CreateRangeAsync(IEnumerable<Customer> customer)
        {
            RepositoryContext.Set<Customer>().AddRange(customer);
            await RepositoryContext.SaveChangesAsync();
        }


        public async Task UpdateCustomer(Customer customer) => await UpdateAsync(customer);

        public async Task DeleteCustomer(Customer customer) => await RemoveAsync(customer);

        public async Task<Customer?> GetCustomer(int CustomerId, bool trackChanges)
        => await FindByConditionAsync(c => c.Id.Equals(CustomerId), trackChanges).Result.SingleOrDefaultAsync();

        public async Task<IEnumerable<Customer>> GetActiveCustomer(bool isActive, bool trackChanges)
        => await FindByConditionAsync(c=>c.IsActive.Equals(isActive), trackChanges).Result.ToListAsync();

        public Task<bool> emailService(string email, bool trackChanges)
        {
            throw new NotImplementedException();
        }
    }

}

