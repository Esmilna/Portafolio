using Microsoft.EntityFrameworkCore;
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
    public class Sale
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public Sale()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
            Estatus = "En proceso";
            FechaVenta = DateTime.Now;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public DateTimeOffset FechaVenta { get; set; }

        [Precision(10, 2)]
        [Range(0, int.MaxValue)]
        public decimal Total { get; set; }
        public string MetodoPago { get; set; }
        public string Estatus { get; set; }

        public int ClientID { get; set; }

        [ForeignKey("ClientID")]
        public virtual Client? Client { get; set; }
        [JsonIgnore]
        public IEnumerable<SaleDetails>? SalesDetails { get; set; }
    }
}
