using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDeInventarioDeVentaDeVehiculos.Data.Entities
{
    public class User : BaseEntity
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public User(string role)
        {

            if(role == "usuario" || role == "admin")
            {
                Role = role;
            }
            else
            {
                Role = "usuario";
            }
        }

        [MinLength(3)]
        public string Nombre { get; set; }

        [MinLength(3)]
        public string Apellido { get; set; }
        [MinLength(5)]
        public string NombreUsuario { get; set; }

        [MinLength(8)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string? Direccion { get; set; }

        [MaxLength(20)]
        [DataType(DataType.PhoneNumber)]
        public string? Telefono { get; set; }

        [MaxLength(100)]
        [DataType(DataType.EmailAddress)]
        public string Correo { get; set; }

        [MaxLength(20)]
        public string Role { get; set; }
    }
}
