using System;
using System.Collections.Generic;
using System.Text;

namespace Repository.Model
{
   public class PaymentSP
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CardNumber { get; set; }
        public string CVV { get; set; }
    }
}
