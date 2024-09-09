using SistemaDeInventarioDeVentaDeVehiculos.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DB.Data.Entities
{
    public class Model : BaseEntity
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Model() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        [Required]
        [MinLength(3)]
        [MaxLength(15)]
        public string Nombre { get; set; }
        [JsonPropertyName("brandId")]
        public int BrandID { get; set; }

        [ForeignKey("BrandID")]
        [JsonPropertyName("brand")]
        public virtual Brand? Brand { get; set; }

        [JsonIgnore]

        public ICollection<Car>? Cars { get; set; }
    }
}
