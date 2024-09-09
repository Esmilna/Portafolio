using Microsoft.EntityFrameworkCore;
using SistemaDeInventarioDeVentaDeVehiculos.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Data.Entities
{
    public class Car : BaseEntity
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Car() {

        }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        [MinLength(3)]
        [MaxLength(30)]
        [Required]
        public string Nombre { get; set; }

        [MaxLength(20)]
        [Required]
        public string Chasis { get; set; }
        [MaxLength(15)]
        [Required]
        public string Placa { get; set; }
        [Required]
        [Range(1970, int.MaxValue)]
        public int Anio { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        [Precision(10,2)]
        public decimal Cilindraje { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int KilometrosTablero { get; set; }
        [Required]
        [Range(2, byte.MaxValue)]
        public byte CantidadPuerta { get; set; }
        [Required]

        [Precision(10, 2)]
        [Range(0, int.MaxValue)]
        public decimal Precio { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int Stock { get; set; }
        [Required]
        public string Transmision { get; set; }
        [Required]
        public string Combustible { get; set; } 

        public string Descripcion { get; set; }
        public string? ImageURL { get; set; }

        [NotMapped]
        public byte[]? ImageData { get; set; }

        public int ModelID { get; set; }
        [ForeignKey("ModelID")]
        public virtual Model? Model { get; set; }
        public IEnumerable<SaleDetails>? SaleDetails { get; set; }
    }
}
