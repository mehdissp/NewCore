using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataContext.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TokenDemo.Data;

namespace TokenDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public ValuesController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        //private ApplicationDBContext context;
        //public ValuesController(ApplicationDBContext _context)
        //{
        //     context= _context;
        //}
        // GET api/values
        [HttpGet]
        [Route("values")]
        public ActionResult<IEnumerable<string>> Get()
        {
           // return context.Users.Select(u => u.UserName).ToArray();
            return new string[] { "value1", "value2" };
        }
        [HttpGet]
        [Authorize(Roles ="Admin")]
        [Route("GetUserProfile")]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.Id,
                user.Email,
        
                user.UserName
            };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
