using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentTeacher.Core.Models;

namespace StudentTeacher.Repo.Data;

public class RepositoryContext : IdentityDbContext<User>
{
    public RepositoryContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //modelBuilder.ApplyConfiguration(new TeacherData());
        //modelBuilder.ApplyConfiguration(new StudentData());
        modelBuilder.ApplyConfiguration(new CustomerData());
        modelBuilder.Entity<Customer>()
           .HasIndex(e => e.CompanyTel)
           .IsUnique();



        modelBuilder.Entity<Customer>()
            .HasIndex(e => e.CompanyMail)
            .IsUnique();
    }

    //public DbSet<Teacher> Teachers { get; set; }
    //public DbSet<Student> Students { get; set; }
    public DbSet<Customer> Customer { get; set; }

}
