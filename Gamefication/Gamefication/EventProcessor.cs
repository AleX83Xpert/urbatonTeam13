using System.Linq;
using Gamefication.DTO;
using Gamefication.Storages;
using JetBrains.Annotations;

namespace Gamefication
{
    public class EventProcessor
    {
        private const int DefaultDelta = 100;

        private readonly IGameficationStateStorage gameficationStateStorage;

        public EventProcessor(IGameficationStateStorage gameficationStateStorage)
        {
            this.gameficationStateStorage = gameficationStateStorage;
        }

        public void ProcessEvents([NotNull] [ItemNotNull] SqlEvent[] events)
        {
            var groupedEvents = events.GroupBy(x => x.CitizenId);
            groupedEvents.AsParallel()
                .WithDegreeOfParallelism(75)
                .ForAll(g =>
                {
                    var currentState = gameficationStateStorage.TryGetState(g.Key);
                    foreach (var @event in g) currentState = ProcessEvent(@event, currentState);

                    if (currentState != null)
                        gameficationStateStorage.UpdateState(currentState);
                });
        }

        [NotNull]
        private SqlGameficationState ProcessEvent([NotNull] SqlEvent @event, [CanBeNull] SqlGameficationState state)
        {
            if (state == null)
                return new SqlGameficationState
                {
                    Loyalty = DefaultDelta,
                    UserId = @event.CitizenId,
                };

            return new SqlGameficationState
            {
                Loyalty = state.Loyalty + DefaultDelta,
                UserId = state.UserId,
            };
        }
    }
}