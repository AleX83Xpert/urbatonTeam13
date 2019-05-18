using System.ComponentModel.DataAnnotations.Schema;
using JetBrains.Annotations;

namespace Gamefication.DTO
{
    public class SqlEvent
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public ulong CitizenId { get; set; }

        public ulong CollectorId { get; set; }

        [NotNull] public long TimestampTicks { get; set; }

        [NotNull] public Lot Lot { get; set; }
    }
}