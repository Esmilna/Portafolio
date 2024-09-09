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
    public class Brand : BaseEntity
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Brand() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        [Required]
        [MinLength(3)]
        [MaxLength(15)]
        public string Nombre { get; set; }

        [JsonIgnore]
        public ICollection<Model>? Models { get; set; }
    }
}
