using Gamefication.DTO;
using JetBrains.Annotations;

namespace Gamefication.Storages
{
    public interface IGameficationStateStorage
    {
        void UpdateState([NotNull] SqlGameficationState state);

        [CanBeNull]
        SqlGameficationState TryGetState(ulong userId);
    }
}