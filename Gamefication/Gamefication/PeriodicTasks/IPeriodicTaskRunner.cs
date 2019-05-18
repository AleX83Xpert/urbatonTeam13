using System;
using JetBrains.Annotations;

namespace Gamefication.PeriodicTasks
{
    public interface IPeriodicTaskRunner
    {
        void Register([NotNull] IPeriodicTask task, TimeSpan period);
        void Unregister([NotNull] string taskId, int timeout);
    }
}