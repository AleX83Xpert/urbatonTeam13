using System;
using Gamefication.DTO;
using JetBrains.Annotations;

namespace Gamefication.Storages
{
    internal interface IEventReader
    {
        [NotNull]
        [ItemNotNull]
        Event[] GetEvents(Guid? inclusiveStartEventId, int batchSize = 1000);
    }
}