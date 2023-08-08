using StudentTeacher.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using StudentTeacher.Core.Dtos;

namespace StudentTeacher.Core.Mappings
{
    public class CustomerMappingProfile : Profile
    {
        public CustomerMappingProfile()
        {
            CreateMap<Customer, CustomerDto>();

            CreateMap<CustomerCreationDto, Customer>();

            CreateMap<CustomerUpdateDto, Customer>().ReverseMap();
        }
    }
}
