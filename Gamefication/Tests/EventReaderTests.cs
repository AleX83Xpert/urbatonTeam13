using System;
using System.Linq;
using Gamefication.DTO;
using Gamefication.Storages;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Tests
{
    [TestClass]
    public class EventReaderTests
    {
        [TestMethod]
        public void Test()
        {
            //using (var db = new ApplicationContext())
            //{
            //    db.ClearDatabase();
            //    db.EnsureDatabaseCreated();
            //}

            WriteEvents(1234);

            var storage = new EventReader();

            var events = storage.GetEvents(0);
            Assert.AreEqual(1000, events.Length);
            events = storage.GetEvents(events.Last().Id);
            Assert.AreEqual(234, events.Length);
            events = storage.GetEvents(events.Last().Id);
            Assert.AreEqual(0, events.Length);
        }

        private void WriteEvents(int count)
        {
            var random = new Random();
            using (var db = new ApplicationContext())
            {
                for (var i = 0; i < count; i++)
                    db.Events.Add(new SqlEvent
                    {
                        CitizenId = random.Next(100),
                        CollectorId = random.Next(100),
                        TimestampTicks = new Timestamp(DateTime.Now).Ticks,
                        LotJson = JsonConvert.SerializeObject(new Lot
                        {
                            LotType = (LotType) random.Next(3),
                            Quantity = new Quantity
                            {
                                MeasurementUnit = "kg",
                                Value = random.NextDouble()
                            }
                        })
                    });

                db.SaveChanges();
            }
        }
    }
}