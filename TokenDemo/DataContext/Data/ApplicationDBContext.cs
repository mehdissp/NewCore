using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Repository.Model;
using Repository.Model.Helper;


namespace DataContext.Data
{
  public  class ApplicationDBContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
           // builder.g("public");
            base.OnModelCreating(builder);
          
        }
        public DbSet<PaymentDetail> PaymentDetails { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<TypePayment> TypePayment { get; set; }

        public virtual DbSet<PaymentSP> PaymentSP { get; set; }

        public virtual DbSet<UsersShow> UsersShow { get; set; }
    }
}
