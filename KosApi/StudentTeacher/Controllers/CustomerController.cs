using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentTeacher.Core.Dtos;
using StudentTeacher.Core.Models;
using StudentTeacher.Repo.Data;
using StudentTeacher.Service.Filters.ActionFilters;
using StudentTeacher.Service.Interfaces;
using System.Security.AccessControl;

namespace StudentTeacher.Controllers
{
    [Route("api/customers")]
    [ApiController]
    [AllowAnonymous]

    public class CustomerController : BaseApiController
    {

        private readonly RepositoryContext _repositoryContext;

        public CustomerController(IRepositoryManager repository, ILoggerManager logger, IMapper mapper, RepositoryContext repositoryContext) : base(repository, logger, mapper)
        {
            _repositoryContext = repositoryContext;
        }

    
        //[HttpGet]
        //[ResponseCache(CacheProfileName = "30SecondsCaching")]
        //public async Task<IActionResult> GetCustomer()
        //{
        //    try
        //    {
        //        var teachers = await _repository.Customer.GetAllCustomer(trackChanges: false);
        //        var teachersDto = _mapper.Map<IEnumerable<CustomerDto>>(teachers);
        //        return Ok(teachersDto);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Something went wrong in the {nameof(GetCustomer)} action {ex}");
        //        return StatusCode(500, "Internal server error");
        //    }
        //}


        [HttpGet("/api/Customers")]
        public async Task<IActionResult> GetActiveCustomer()
        {
            try
            {
                var teachers = await _repository.Customer.GetActiveCustomer(true,trackChanges: false);
                var teachersDto = _mapper.Map<IEnumerable<CustomerDto>>(teachers);
                return Ok(teachersDto);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong in the {nameof(GetCustomer)} action {ex}");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("/CustomerSize")]
        public async Task<IActionResult> GetCustomerSize()
        {
            try
            {
                var teachers = await _repository.Customer.GetAllCustomer(trackChanges: false);
                var teachersDto = _mapper.Map<IEnumerable<CustomerDto>>(teachers);
               var count =  teachersDto.Count();
                    
                return Ok(count);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong in the {nameof(GetCustomer)} action {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("/AddCustomer")]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerCreationDto customer)
        {
            try
            {
                // Check if the model state is valid
                if (!ModelState.IsValid)
                {
                    // If the model state is not valid, return validation error messages
                    var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                    return BadRequest(errors);
                }



                // If the data passes the uniqueness validation, proceed with creating the customer
                var teacherdata = _mapper.Map<Customer>(customer);
                teacherdata.CreateDate = DateTime.UtcNow;
                await _repository.Customer.CreateCustomer(teacherdata);
                await _repository.SaveAsync();
                var teacherReturn = _mapper.Map<CustomerDto>(teacherdata);
                return Ok("Customer Created");
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500);
            }
        }
        [HttpPost("CreateRange")]
        public async Task<IActionResult> CreateRange([FromBody] IEnumerable<CustomerCreationDto> entityDtos)
        {
      
            // DTO listesini varlık listesine dönüştür
            var entities = _mapper.Map<IEnumerable<Customer>>(entityDtos);

            await _repository.Customer.CreateRangeAsync(entities);
            await _repository.SaveAsync();


            return Ok("Toplu olarak başarıyla oluşturuldu.");
        }

        [HttpGet("/Customer/GetById/{customerId}", Name = "CustomerById")]
        public async Task<IActionResult> GetCustomer(int customerId)
        {
            var teacher = await _repository.Customer.GetCustomer(customerId, trackChanges: false);
            if (teacher is null)
            {
                _logger.LogInfo($"Teacher with id: {customerId} doesn't exist in the database.");
                return NotFound();
            }
            else
            {
                var teacherDto = _mapper.Map<CustomerDto>(teacher);
                return Ok(teacherDto);
            }
        }

        [HttpPost("/email")]
        public async Task<IActionResult> emailService(string email)
        {
            var customer = await _repositoryContext.Customer.FirstOrDefaultAsync(entity => entity.CompanyMail == email);
            if (customer is null)
            {
                return Ok(false); // Email not found, return false
            }
            else
            {
                return Ok(true); // Email found, return true
            }
        }


        //[HttpPost("Customer/Delete/{id}")]
        //public async Task<IActionResult> DeleteCustomer(int id)
        //{
        //    try
        //    {
        //        var customer = await _repository.Customer.GetCustomer(id, trackChanges: false);

        //        if (customer == null)
        //        {
        //            _logger.LogError($"Customer with id {id} was not found.");
        //            return NotFound();
        //        }

        //        await _repository.Customer.DeleteCustomer(customer);
        //        await _repository.SaveAsync();

        //        return NoContent(); // İşlem başarılı, içerik döndürülmedi.
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Something went wrong in the {nameof(DeleteCustomer)} action: {ex}");
        //        return StatusCode(500, "Internal server error");
        //    }
        //}

        [HttpPost("Customer/Update/{CustomerId}")]

        public async Task<IActionResult> UpdateCustomer(int CustomerId, [FromBody] Customer customer)
        {
            try
            {
                if (customer == null)
                {
                    return BadRequest("Customer data is missing.");
                }

                if (string.IsNullOrEmpty(customer.CompanyName))
                {
                    return BadRequest("Company Name is required.");
                }

                // Diğer gerekli alanlar için de kontrol sağlayabilirsiniz...

                var existingCustomer = await _repository.Customer.GetCustomer(CustomerId, trackChanges: true);

                if (existingCustomer == null)
                {
                    return NotFound();
                }

                // Güncellenecek bilgileri mevcut müşteri nesnesine aktarın
                existingCustomer.CompanyName = customer.CompanyName;
                existingCustomer.CompanyMail = customer.CompanyMail;
                existingCustomer.CompanySector = customer.CompanySector;
                existingCustomer.CompanyTel = customer.CompanyTel;
                existingCustomer.CompanyWeb = customer.CompanyWeb;
                existingCustomer.UpdateDate = DateTime.Now;

                // Güncellenen müşteriyi veritabanına kaydedin
                await _repository.Customer.UpdateCustomer(existingCustomer);
                await _repository.SaveAsync();

                // Güncellenen müşteri bilgisini dönün (isteğe bağlı)
                var updatedCustomerDto = _mapper.Map<CustomerDto>(existingCustomer);
                return Ok(updatedCustomerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //[HttpPost("Customer/active/{CustomerId}")]

        //public async Task<IActionResult> ChangeIsActive(int CustomerId, [FromBody] Customer customer)
        //{
        //    var existingCustomer = await _repository.Customer.GetCustomer(CustomerId, trackChanges: true);

        //    if (existingCustomer == null)
        //    {
        //        return NotFound();
        //    }
        //    // Güncellenecek bilgileri mevcut müşteri nesnesine aktarın
        //    existingCustomer.IsActive = customer.IsActive;
          

        //    // Güncellenen müşteriyi veritabanına kaydedin
        //    await _repository.Customer.UpdateCustomer(existingCustomer);
        //    await _repository.SaveAsync();

        //    // Güncellenen müşteri bilgisini dönün (isteğe bağlı)
        //    var updatedCustomerDto = _mapper.Map<CustomerDto>(existingCustomer);
        //    return Ok(updatedCustomerDto);
        //}

        [HttpPost("/Customer/passive/{CustomerId}")]

        public async Task<IActionResult> ChangeIsPassive(int CustomerId, [FromBody] Customer customer)
        {
            var existingCustomer = await _repository.Customer.GetCustomer(CustomerId, trackChanges: true);

            if (existingCustomer == null)
            {
                return NotFound();
            }
            // Güncellenecek bilgileri mevcut müşteri nesnesine aktarın
            existingCustomer.IsActive = false;


            // Güncellenen müşteriyi veritabanına kaydedin
            await _repository.Customer.UpdateCustomer(existingCustomer);
            await _repository.SaveAsync();

            // Güncellenen müşteri bilgisini dönün (isteğe bağlı)
            var updatedCustomerDto = _mapper.Map<CustomerDto>(existingCustomer);
            return Ok(updatedCustomerDto);
        }



    }
}
