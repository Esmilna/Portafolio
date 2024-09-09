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
        public Car() {

        }

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
        public string Anio { get; set; }
        [Required]
        public string Color { get; set; }
        [Required]
        public string Cilindraje { get; set; }
        [Required]
        public int KilometrosTablero { get; set; }
        [Required]
        public byte CantidadPuerta { get; set; }
        [Required]

        public float Precio { get; set; }
        [Required]
        public int Stock { get; set; }
        [Required]
        public string Transmicion { get; set; }
        [Required]
        public string Combustible { get; set; } 

        public int ModelID { get; set; }
        [ForeignKey("ModelID")]
        public virtual Model Model { get; set; }

    }
}
