using System.ComponentModel.DataAnnotations.Schema;

namespace Gamefication.DTO
{
    public class SqlGameficationState
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public ulong UserId { get; set; }

        public double Loyalty { get; set; }
    }
}