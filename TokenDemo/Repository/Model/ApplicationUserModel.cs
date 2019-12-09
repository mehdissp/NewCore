using System;
using System.Collections.Generic;
using System.Text;

namespace Repository.Model
{
  public  class ApplicationUserModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PassWord { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
    }
}
