using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using StudentTeacher.Core.Models;
using StudentTeacher.Repo.Data;
using StudentTeacher.Service.Interfaces;

namespace StudentTeacher.Service.Services;

public class RepositoryManager : IRepositoryManager
{
    private RepositoryContext _repositoryContext;

    private IUserAuthenticationRepository _userAuthenticationRepository;
    private ICustomerRepository _customerRepository;
    private UserManager<User> _userManager;
    private IMapper _mapper;
    private IConfiguration _configuration;

    public RepositoryManager(RepositoryContext repositoryContext, UserManager<User> userManager, IMapper mapper, IConfiguration configuration) 
    {
        _repositoryContext = repositoryContext;
        _userManager = userManager;    
        _mapper = mapper;   
        _configuration = configuration; 
    }

 
    public ICustomerRepository Customer
    {
        get
        {
            if (_customerRepository is null)
                _customerRepository = new CustomerRepository(_repositoryContext);
            return _customerRepository;
        }
    }

    public IUserAuthenticationRepository UserAuthentication
    {
        get
        {
            if (_userAuthenticationRepository is null)
                _userAuthenticationRepository = new UserAuthenticationRepository(_userManager, _configuration, _mapper);
            return _userAuthenticationRepository;
        }
    }



    public Task SaveAsync() => _repositoryContext.SaveChangesAsync();
}
