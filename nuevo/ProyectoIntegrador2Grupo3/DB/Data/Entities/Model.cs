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
    public class Model : BaseEntity
    {
        public Model() { }

        [Required]
        [MinLength(3)]
        [MaxLength(15)]
        public string Nombre { get; set; }

        public int BrandID { get; set; }

        [ForeignKey("BrandID")]
        public virtual Brand Brand { get; set; }

    }
}
