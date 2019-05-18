namespace Gamefication.Storages
{
    internal interface IEventReaderPointerStorage
    {
        long GetLastProcessedEventId();
        void UpdateLastProcessedEventId(long lastProcessedEventId);
    }
}