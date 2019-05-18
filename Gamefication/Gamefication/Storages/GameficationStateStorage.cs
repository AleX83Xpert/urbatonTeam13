using System.Linq;
using Gamefication.DTO;
using JetBrains.Annotations;

namespace Gamefication.Storages
{
    public class GameficationStateStorage : IGameficationStateStorage
    {
        public void UpdateState([NotNull] SqlGameficationState state)
        {
            using (var db = new ApplicationContext())
            {
                var oldState = db.GameficationStates.FirstOrDefault(x => x.UserId == state.UserId);
                if (oldState == null)
                {
                    db.GameficationStates.Add(state);
                }
                else
                {
                    oldState.Loyalty = state.Loyalty;
                    db.GameficationStates.Update(oldState);
                }

                db.SaveChanges();
            }
        }

        [CanBeNull]
        public SqlGameficationState TryGetState(ulong userId)
        {
            using (var db = new ApplicationContext())
            {
                return db.GameficationStates.FirstOrDefault(x => x.UserId == userId);
            }
        }
    }
}