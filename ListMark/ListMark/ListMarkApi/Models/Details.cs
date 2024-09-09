using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListMarkApi.Models
{
    public class Details
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int SupermarketId { get; set; }
        public int StockId { get; set; }
        /*[ForeignKey("ProductId")]
        public Product Product { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [ForeignKey("StockId")]
        public Stock Stock { get; set; }
        [ForeignKey("SupermarketId")]
        public Supermarket Supermarket { get; set; }*/
    }
}
