﻿using System;
using JetBrains.Annotations;

namespace Gamefication.PeriodicTasks
{
    public static class PeriodicTaskRunnerExtensions
    {
        public static void Register([NotNull] this IPeriodicTaskRunner periodicTaskRunner, [NotNull] string taskId,
            TimeSpan period, [NotNull] Action taskAction)
        {
            periodicTaskRunner.Register(new ActionPeriodicTask(taskId, taskAction), period);
        }

        public static void Unregister([NotNull] this IPeriodicTaskRunner periodicTaskRunner, [NotNull] string taskId,
            TimeSpan timeout)
        {
            periodicTaskRunner.Unregister(taskId, (int) timeout.TotalMilliseconds);
        }
    }
}