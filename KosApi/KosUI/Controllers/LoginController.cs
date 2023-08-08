using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;

namespace KosUI.Controllers
{
    public class LoginController : Controller
    {

   
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

  

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

     
    }
}
