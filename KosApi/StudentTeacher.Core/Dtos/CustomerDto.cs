using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentTeacher.Core.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }

        public string? CompanyName { get; set; }


        public string? CompanyWeb { get; set; }

 
        public string? CompanyMail { get; set; }


        public long? CompanyTel { get; set; }

        public string? CompanySector { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public class CustomerCreationDto : CustomerAddUpdateDto
    {

    }

    public class CustomerUpdateDto : CustomerAddUpdateDto
    {

    }

    public abstract class CustomerAddUpdateDto
    {

        public string? CompanyName { get; set; }

        //[Url(ErrorMessage = "Ivalid Web address.")]
        public string? CompanyWeb { get; set; }

   
        public string? CompanyMail { get; set; }

 
        public long? CompanyTel { get; set; }

        public string? CompanySector { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }




}
