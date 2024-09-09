using SistemaDeInventarioDeVentaDeVehiculos.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DB.Data.Entities
{
    public class Client : BaseEntity
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        [MinLength(3)]
        public string Nombre { get; set; }

        [MinLength(3)]
        public string Apellido { get; set; }

        [MinLength(8)]
        [MaxLength(100)]
        public string Direccion { get; set; }

        [MaxLength(20)]
        [DataType(DataType.PhoneNumber)]
        public string Telefono { get; set; }

        [MaxLength(100)]
        [DataType(DataType.EmailAddress)]
        public string Correo { get; set; }
        [JsonIgnore]
        public IEnumerable<Sale>? Sales { get; set; }
    }
}
