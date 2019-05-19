using System.ComponentModel.DataAnnotations.Schema;

namespace Gamefication.DTO
{
    [Table("last_processed_event", Schema = "garbage_collector")]
    public class SqlLastProcessedEvent
    {
        public long Id { get; set; }
        public long EventId { get; set; }
    }
}