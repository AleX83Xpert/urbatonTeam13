using System;
using System.Threading;
using Gamefication.PeriodicTasks;
using Gamefication.Storages;

namespace Gamefication
{
    internal class EntryPoint
    {
        private static void Main()
        {
            new EntryPoint().Start();
        }

        private void Start()
        {
            var eventFeed = new EventFeed(new EventReaderPointerStorage(), new EventReader());
            var eventProcessor = new EventProcessor(new GameficationStateStorage());
            new ThreadBasedPeriodicTaskRunner().Register(
                "ProcessEventsTask",
                TimeSpan.FromSeconds(10),
                () => eventFeed.ConsumeNextEventBatch(eventProcessor.ProcessEvents));

            Thread.Sleep(Timeout.Infinite);
        }
    }
}