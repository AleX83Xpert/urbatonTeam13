using System.ComponentModel.DataAnnotations.Schema;
using JetBrains.Annotations;

namespace Gamefication.DTO
{
    [Table("events", Schema = "garbage_collector")]
    public class SqlEvent
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public long CitizenId { get; set; }

        public long CollectorId { get; set; }

        [NotNull] public long TimestampTicks { get; set; }

        [NotNull] public string LotJson { get; set; }
    }
}