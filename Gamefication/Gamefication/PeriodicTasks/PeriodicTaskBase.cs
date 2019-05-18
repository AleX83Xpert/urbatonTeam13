namespace Gamefication.PeriodicTasks
{
    public abstract class PeriodicTaskBase : IPeriodicTask
    {
        protected PeriodicTaskBase(string id = null)
        {
            Id = id ?? GetType().Name;
        }

        public abstract void Run();
        public string Id { get; }
    }
}