using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TokenDemo.Data;

using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;
using DataContext.Data;
using Repository.Model;
using Repository.Model.Helper;
using PaymentSP = Repository.Model.PaymentSP;
using System.Data.SqlClient;
using System.Data;
using TokenDemo.SMTP;
using TokenDemo.FCM.Helper;
using TokenDemo.FCM;

namespace TokenDemo.Controllers
{
    [EnableCors("CorsPolicy")]
    //[EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private UserManager<ApplicationUser> userManager;
        private readonly ApplicationDBContext _context;
        #region [ - ctor - ]
        public AuthController(UserManager<ApplicationUser> _userManager, ApplicationDBContext context)
        {
            userManager = _userManager;
            _context = context;
        } 
        #endregion

        #region [ - Login - ]
        [EnableCors("CorsPolicy")]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);

            IdentityOptions _options = new IdentityOptions();
            {
                if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                {
                    var role = await userManager.GetRolesAsync(user);
                    var claims = new[]
                    {   new Claim("UserId",user.Id.ToString()),
                       new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault()),
                    //    new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                        new Claim(JwtRegisteredClaimNames.Sub,user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                    };

                    var signingkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecureKey"));

                    var token = new JwtSecurityToken(
                        issuer: "",
                        audience: "",
                        expires: DateTime.UtcNow.AddHours(1),
                        claims: claims,
                        signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(signingkey, SecurityAlgorithms.HmacSha256)
                        );

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        role = role.FirstOrDefault()
                    });
                }
                return Unauthorized();
            }

        } 
        #endregion


        #region [ - Register - ]
        [HttpPost]
        [Route("Register")]
        public async Task<Object> PostApplicationUser([FromBody]ApplicationUserModel model)
        {
           // model.Role = "Admin";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
               
            };
           // model.PassWord = "M@12345m";
            try
            {
                var result = await userManager.CreateAsync(applicationUser, model.PassWord);
                await userManager.AddToRoleAsync(applicationUser, model.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw;
            }
        } 
        #endregion



        #region [ - test - ]
        [HttpGet("test")]
        public async Task<ActionResult<Object>> GetPaymentDetails()
        {
            try
            {
                var Payment = _context.Payment
     .FromSql("EXECUTE [dbo].[usp_SelectPayment] ")
     .ToList();


                return new
                {

                    data = Payment
                };
            }
            catch (Exception EX)
            {

                return new
                {
                    EX
                };
            }

        } 
        #endregion


        #region [ - GetTypeName - ]
        [HttpGet("GetTypeName")]
        public async Task<ActionResult<Object>> GetTypeName()
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserId").Value;
                var user = await userManager.FindByIdAsync(userId);

                var t = await _context.TypePayment.ToListAsync();
                var test = _context.PaymentSP.FromSql($"EXECUTE [dbo].[usp_SelectPayment]").ToList();
                return new
                {
                    datagrid = test,
                    data = t
                };
            }
            catch (Exception EX)
            {

                return new
                {
                    EX
                };
            }

        } 
        #endregion

        #region [ - Insert - ]
        [HttpPost("Insert")]
        public async Task<ActionResult<Object>> Insert([FromBody] Helper_Insert model)
        {
            try
            {
                await _context.Database.ExecuteSqlCommandAsync("EXECUTE [dbo].[usp_insert] {0},{1},{2}", model.Name, model.CVV, model.CardNumber);

                return new
                {

                };
            }
            catch (Exception EX)
            {

                return new
                {
                    EX
                };
            }

        } 
        #endregion


        #region [ - Delete - ]
        [HttpPost("Delete")]
        public async Task<ActionResult<Object>> Delete([FromBody] PaymentSP model)
        {
            try
            {
                var httpRequest = HttpContext.Request;

                await _context.Database.ExecuteSqlCommandAsync("EXECUTE [dbo].[usp_delete] {0}", model.Id);

                return new
                {
                    // data = ts

                };
            }
            catch (Exception EX)
            {

                return new
                {
                    EX
                };
            }

        } 
        #endregion

        #region [ - Update - ]
        [HttpPost("Update")]
        public async Task<ActionResult<Object>> Update([FromBody] PaymentSP model)
        {
            try
            {
                var httpRequest = HttpContext.Request;

                await _context.Database.ExecuteSqlCommandAsync("EXECUTE [dbo].[usp_Update] {0},{1},{2},{3}", model.Id, model.CardNumber, model.CVV, model.Name);

                return new
                {
                    // data = ts

                };
            }
            catch (Exception EX)
            {

                return new
                {
                    EX
                };
            }

        }
        #endregion

        #region [ - Users - ]
        [HttpGet("Users")]
        public async Task<ActionResult<Object>> Users()
        {
            try
            {
                var t = await _context.Roles.ToListAsync();
                var test = await _context.UsersShow.FromSql($"EXECUTE [dbo].[usp_AspNetUsers]").ToListAsync();
                return new
                {
                    datagrid = test,
                    data = t
                };
            }
            catch (Exception EX)
            {

                return new
                {
                    EX
                };
            }

        }
        #endregion

        #region [- SendEmail() -]

       
        [HttpPost("SendEmail")]
        public async Task<ActionResult<Object>> SendEmail([FromBody] Helper_SendEmail model)
        {
         //   var model = data["data"].ToObject<Helper_SendEmail>();
            //--------------------------------------------------
            SMTP_Helper.Prepare_Send_Email(model.Name, model.Email, "Congratulation");
            //---------------------------------------------------
            return Ok();
        }

        #endregion

        #region [ - SFCM - ]
       // [ActionName("SFCM")]
        [HttpPost("SFCM")]
        public async Task<ActionResult<Object>> CallFCM_Request_test()
        {
  //          var claimsIdentity_User = (ClaimsIdentity)User.Identity;
    //        string UserID = claimsIdentity_User.Claims.Where(c => c.Type == "UserID").Select(c => c.Value).First();
    //        long userID = Convert.ToInt64(UserID);
            FCMResult ref_FCMResult = new FCMResult();
            string universalID = "";
            var fcmTokens = "sdbdbd";//await Ref_S5T05_ViewModel.SelectRecords_In_S1T06(userID, universalID);
            FCM_Helper ref_FCM_Helper = new FCM_Helper()
            {
                NotificationTitle = "TEST",
                Message = "شما به بازی دعوت شدید",
                ResponseType = 0
                //Topic = ref_FCM_Helper_Native.topic
            };

            FCMPushNotification ref_FCMPushNotification = new FCMPushNotification(new FCMResult());



            //foreach (var item in fcmTokens)
            //{
                ref_FCM_Helper.FCMToken = fcmTokens;
                ref_FCMResult = await ref_FCMPushNotification.SendNotification(ref_FCM_Helper);
            //}

            return Ok(ref_FCMResult);
        }
        #endregion

    }
}