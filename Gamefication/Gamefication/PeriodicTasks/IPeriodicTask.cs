using JetBrains.Annotations;

namespace Gamefication.PeriodicTasks
{
    public interface IPeriodicTask
    {
        [NotNull] string Id { get; }

        void Run();
    }
}