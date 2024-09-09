using DB.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Data.Requests
{
    public class RequestLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public RequestLogin(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }

    public class RequestSale
    {
        public ProductCart[]? ProductList { get; set; }
        public string PaymentMethod { get; set; }
        public int ClientId { get; set; }

        public RequestSale(string paymentMethod)
        {
            PaymentMethod = paymentMethod;
        }
    }

    public class EditPasswordRequest
    {
        public string? OldPassword { get; set; }

        public string? NewPassword { get; set; }
    }

    public class RequestProfile
    {
        public int? id { get; set; }
        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public string? Direccion { get; set; }

        public string? Telefono { get; set; }

        public string Correo { get; set; }
        public string? ImageURL { get; set; }

        public byte[]? ImageData { get; set; }
    }


    public class SaleRequest
    {
        public string status { get; set; }
    }

    public class SearchRequest
    {
        public string? Nombre { get; set; }
        public string? Id { get; set; }
    }
}
