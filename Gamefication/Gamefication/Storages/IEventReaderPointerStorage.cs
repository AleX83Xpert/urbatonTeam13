using System;

namespace Gamefication.Storages
{
    internal interface IEventReaderPointerStorage
    {
        Guid? TryGetLastProcessedEventId();
        void UpdateLastProcessedEventId(Guid lastProcessedEventId);
    }
}