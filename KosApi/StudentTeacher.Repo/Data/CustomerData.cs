using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using StudentTeacher.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentTeacher.Repo.Data
{
    public class CustomerData : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasData(
                new Customer
                {
                    Id=1,
                    CompanyName = "Company",
                    CompanyMail = "company@example.com",
                    CompanySector = "Software",
                    CompanyTel = 55555555,
                    CompanyWeb = "www.company.com",
                    CreateDate = DateTime.Now,
                    IsActive=true
                }
                );
        }
    }
}


