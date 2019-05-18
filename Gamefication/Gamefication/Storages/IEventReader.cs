using Gamefication.DTO;
using JetBrains.Annotations;

namespace Gamefication.Storages
{
    internal interface IEventReader
    {
        [NotNull]
        [ItemNotNull]
        SqlEvent[] GetEvents(long exclusiveStartEventId, int batchSize = 1000);
    }
}