using System;
using JetBrains.Annotations;

namespace Gamefication.DTO
{
    public class Event
    {
        public Guid EventId { get; set; }

        [NotNull] public Timestamp Timestamp { get; set; }

        [NotNull] public Lot Lot { get; set; }
    }
}