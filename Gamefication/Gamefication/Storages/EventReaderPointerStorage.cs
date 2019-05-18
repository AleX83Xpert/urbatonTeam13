using System;

namespace Gamefication.Storages
{
    internal class EventReaderPointerStorage : IEventReaderPointerStorage
    {
        public Guid? TryGetLastProcessedEventId()
        {
            throw new NotImplementedException();
        }

        public void UpdateLastProcessedEventId(Guid lastProcessedEventId)
        {
            throw new NotImplementedException();
        }
    }
}