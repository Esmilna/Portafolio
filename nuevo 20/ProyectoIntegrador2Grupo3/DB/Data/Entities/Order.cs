using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Data.Entities
{
    public class Order
    {
        public ProductCart[]? ProductList { get; set; }

        public string PaymentMethod { get; set; }

        public Order(string paymentMethod)
        {
            PaymentMethod = paymentMethod;
        }

        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
    }
}
