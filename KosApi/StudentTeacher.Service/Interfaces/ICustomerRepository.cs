using StudentTeacher.Core.Models;
using StudentTeacher.Repo.Data;

namespace StudentTeacher.Service.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAllCustomer(bool trackChanges);

        Task  UpdateCustomer(Customer customer);

        Task CreateCustomer(Customer customer);
        Task CreateRangeAsync(IEnumerable<Customer> customer);

        Task<IEnumerable<Customer>> GetActiveCustomer(bool isActive,bool trackChanges);

        Task<Customer> GetCustomer(int CustomerId, bool trackChanges);

        Task<Boolean> emailService(string email, bool trackChanges);

        Task DeleteCustomer(Customer customer);

    }
}
