using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentTeacher.Core.Models
{
    public class Customer
    {
        [Column("CompanyId")]
        public int Id { get; set; }

        //[Required(ErrorMessage = "CompanyName alanı zorunludur.")]
        //[MinLength(3, ErrorMessage = "CompanyName en az 3 karakter olmalıdır.")]
        public string? CompanyName { get; set; }

        //[Url(ErrorMessage = "Geçersiz CompanyWeb adresi.")]
        public string? CompanyWeb { get; set; }

        //[Required(ErrorMessage = "CompanyMail alanı zorunludur.")]
        //[EmailAddress(ErrorMessage = "Geçersiz CompanyMail adresi.")]
        public string? CompanyMail { get; set; }

        //[Required(ErrorMessage = "CompanyTel alanı zorunludur.")]
        //[RegularExpression(@"^\d{10,}$", ErrorMessage = "CompanyTel en az 10 basamaklı olmalıdır.")]
        public long? CompanyTel { get; set; }

        public string? CompanySector { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
