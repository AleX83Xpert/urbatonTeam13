using System.Linq;
using Gamefication.DTO;
using JetBrains.Annotations;

namespace Gamefication.Storages
{
    public class EventReader : IEventReader
    {
        [NotNull]
        [ItemNotNull]
        public SqlEvent[] GetEvents(long exclusiveStartEventId, int batchSize = 1000)
        {
            using (var db = new ApplicationContext())
            {
                return db.Events.Where(x => x.Id > exclusiveStartEventId).Take(batchSize).ToArray();
            }
        }
    }
}