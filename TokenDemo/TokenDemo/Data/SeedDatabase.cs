
using DataContext.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TokenDemo.Data
{
    public class SeedDatabase
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ApplicationDBContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                ApplicationUser user = new ApplicationUser()
                {
                    Email = "a@gmail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "admin"
                };
                userManager.CreateAsync(user, "Password@123");
                 userManager.AddToRoleAsync(user, "Admin");
            }
        }
    }
}
