using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ListMarkApi.Models
{
    public class ListDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PermissionId { get; set; }
        public int ListId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("PermissionId")]
        public Permission Permission { get; set; }
        [ForeignKey("ListId")]
        public List List { get; set; }
    }
}
