namespace StudentTeacher.Service.Interfaces;

public interface IRepositoryManager
{

    ICustomerRepository Customer { get; }
    IUserAuthenticationRepository UserAuthentication { get; }

    Task SaveAsync();
}
