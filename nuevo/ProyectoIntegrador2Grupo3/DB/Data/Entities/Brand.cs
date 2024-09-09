using SistemaDeInventarioDeVentaDeVehiculos.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Data.Entities
{
    public class Brand : BaseEntity
    {
        public Brand() { }

        [Required]
        [MinLength(3)]
        [MaxLength(15)]
        public string Nombre { get; set; }
    }
}
