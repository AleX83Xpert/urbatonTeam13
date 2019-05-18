using System.Linq;
using Gamefication.DTO;

namespace Gamefication.Storages
{
    internal class EventReaderPointerStorage : IEventReaderPointerStorage
    {
        public long GetLastProcessedEventId()
        {
            using (var db = new ApplicationContext())
            {
                var persistedEventId = db.LastProcessedEvent.FirstOrDefault(x => x.Id == 1);
                return persistedEventId?.EventId ?? 0;
            }
        }

        public void UpdateLastProcessedEventId(long lastProcessedEventId)
        {
            using (var db = new ApplicationContext())
            {
                var oldState = db.LastProcessedEvent.FirstOrDefault(x => x.Id == 1);
                if (oldState == null)
                {
                    db.LastProcessedEvent.Add(new SqlLastProcessedEvent
                    {
                        Id = 1,
                        EventId = lastProcessedEventId
                    });
                }
                else
                {
                    oldState.EventId = lastProcessedEventId;
                    db.LastProcessedEvent.Update(oldState);
                }

                db.SaveChanges();
            }
        }
    }
}