using System;

namespace Gamefication.PeriodicTasks
{
    public class ActionPeriodicTask : PeriodicTaskBase
    {
        private readonly Action action;

        public ActionPeriodicTask(string id, Action action)
            : base(id)
        {
            this.action = action;
        }

        public sealed override void Run()
        {
            action();
        }
    }
}