using System.ComponentModel.DataAnnotations.Schema;

namespace Gamefication.DTO
{
    [Table("gamefication_state", Schema = "garbage_collector")]
    public class SqlGameficationState
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public long UserId { get; set; }

        public double Loyalty { get; set; }
    }
}