using System;
using System.Diagnostics;
using System.Threading;

namespace Gamefication.PeriodicTasks
{
    internal class ThreadBasedPeriodicTaskExecutor
    {
        private readonly TimeSpan period;

        private readonly IPeriodicTask task;
        private ManualResetEventSlim stopEvent;
        private Thread thread;

        public ThreadBasedPeriodicTaskExecutor(IPeriodicTask task, TimeSpan period)
        {
            this.task = task;
            this.period = period;
        }

        public void Start()
        {
            stopEvent = new ManualResetEventSlim(false);
            thread = new Thread(TaskExecutionProc)
            {
                Name = task.Id,
                IsBackground = true
            };
            thread.Start();
        }

        public void StopAndWait(TimeSpan timeout)
        {
            stopEvent.Set();
            if (!thread.Join(timeout))
                throw new Exception($"Can not stop task for {timeout}");
        }

        private void TaskExecutionProc()
        {
            Stopwatch iterationStopwatch;
            do
            {
                iterationStopwatch = Stopwatch.StartNew();
                try
                {
                    //logger.Debug($"Start run task '{task.Id}'");
                    task.Run();
                    //logger.Debug($"Finish run task '{task.Id}'");
                }
                catch (Exception e)
                {
                    Console.Out.WriteLine($"Error while executing task: {task.Id}, exception: {e}");
                    //logger.Error(e, $"Error while executing task {task.Id}");
                }
            } while (!stopEvent.Wait(Max(TimeSpan.Zero, period - iterationStopwatch.Elapsed)));
        }

        private static TimeSpan Max(TimeSpan first, TimeSpan second)
        {
            return first >= second ? first : second;
        }
    }
}