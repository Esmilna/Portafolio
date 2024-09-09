using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Data.Entities
{
    public class SaleDetails
    {
        public void SetSubTotal()
        {
            SubTotal = CantidadVendida * PrecioUnidad;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int? SaleID { get; set; }
        [ForeignKey("SaleID")]
        public virtual Sale? Sale { get; set; }

        public int CarID { get; set; }
        [ForeignKey("CarID")]
        public virtual Car? Car { get; set; }


        public int CantidadVendida { get; set; }

        [Precision(10, 2)]
        public decimal PrecioUnidad { get; set; }

        [Precision(10, 2)]
        public decimal SubTotal { get; set; }
    }
}
