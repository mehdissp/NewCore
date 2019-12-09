using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Repository.Model.Helper
{
   public class LoginModel
    {
        [Required(ErrorMessage = "UserName is Required.")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password is Required.")]
        public string Password { get; set; }
    }
}
