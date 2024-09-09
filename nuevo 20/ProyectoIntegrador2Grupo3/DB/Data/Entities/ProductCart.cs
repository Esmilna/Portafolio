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
    public class ProductCart
    {
        public int ProductID { get; set; }
        public int Cantidad { get; set; }
        public decimal? PrecioUnidad { get; set; }
    }
}
