using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaDeInventarioDeVentaDeVehiculos.Data.Entities
{
    public class BaseEntity
    {
        protected BaseEntity()
        {
            Estatus = "A";
            Borrado = false;
            FechaRegistro = DateTime.Now;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Estatus { get; set; }
        public bool Borrado { get; set; }
        public DateTimeOffset FechaRegistro { get; set; }
        public DateTimeOffset? FechaModificacion { get; set; }
    }
}
