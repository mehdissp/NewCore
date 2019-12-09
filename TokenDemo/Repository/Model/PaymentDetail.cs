using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Repository.Model
{
   public class PaymentDetail
    {
        [Key]
        public int PMId { get; set; }
        [ForeignKey("Payment")]
        [Column(TypeName = "int")]
        public int Payment_Ref { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string CardOwnerName { get; set; }
        [Required]
        [Column(TypeName = "varchar(16)")]
        public string CardNumber { get; set; }
        [Required]
        [Column(TypeName = "varchar(5)")]
        public string ExpirationDate { get; set; }
        [Required]
        [Column(TypeName = "varchar(3)")]
        public string CVV { get; set; }
    }
}
