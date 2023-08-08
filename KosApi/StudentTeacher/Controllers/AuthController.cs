using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentTeacher.Core.Dtos;
using StudentTeacher.Core.Models;
using StudentTeacher.Service.Filters.ActionFilters;
using StudentTeacher.Service.Interfaces;

namespace StudentTeacher.Controllers;


[Route("/Login")]
[ApiController]
public class AuthController : BaseApiController
{
    private readonly UserManager<User> _userManager;
    public AuthController(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, UserManager<User> userManager) : base(repository, logger, mapper)
    {
        _userManager = userManager;
    }

    [HttpPost("/Register")]
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationDto userRegistration)
    {
        
        var userResult = await _repository.UserAuthentication.RegisterUserAsync(userRegistration);
        return !userResult.Succeeded ? new BadRequestObjectResult(userResult) : StatusCode(201);
    }

    [HttpPost("/login")]
    [ServiceFilter(typeof(ValidationFilterAttribute))]
    public async Task<IActionResult> Authenticate([FromBody] UserLoginDto user)
    {
        var result = await _repository.UserAuthentication.ValidateUserAsync(user);

        if (!result)
        {
            var currentUser = await _userManager.FindByNameAsync(user.UserName);

            if (currentUser != null)
            {
                // Başarısız giriş denemesi sonrasında hesabı kilitle
                await _userManager.AccessFailedAsync(currentUser);

                if (await _userManager.IsLockedOutAsync(currentUser))
                {
                    return Unauthorized("Hesabınız 3 kere yanlış giriş denemesi sonrasında kilitlenmiştir. Daha sonra tekrar deneyin.");
                }
            }

            return Unauthorized("Kullanıcı adı veya şifre geçersiz.");
        }


        //var loggedInUser = await _userManager.FindByNameAsync(user.UserName);
        //await _userManager.ResetAccessFailedCountAsync(loggedInUser);

        return Ok(new { Token = await _repository.UserAuthentication.CreateTokenAsync() });
    }


    [HttpPost("/logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(); 

        return Ok("Çıkış yapıldı.");
    }

}
