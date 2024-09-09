using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListMarkApi.Models
{
    public class Commonfields
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime Creation_date { get; set; }
        public string Created_by { get; set; }
        public DateTime Date_update { get; set; }
        public string Update_by { get; set; }
        public Boolean Is_deleted { get; set; }
           
    }
}
