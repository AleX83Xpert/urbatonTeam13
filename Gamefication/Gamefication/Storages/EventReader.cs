using System;
using Gamefication.DTO;
using JetBrains.Annotations;

namespace Gamefication.Storages
{
    public class EventReader : IEventReader
    {
        [NotNull]
        [ItemNotNull]
        public Event[] GetEvents(Guid? inclusiveStartEventId, int batchSize = 1000)
        {
            throw new NotImplementedException();
        }
    }
}