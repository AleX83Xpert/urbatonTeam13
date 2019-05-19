using System;
using System.Threading;
using Gamefication;
using Gamefication.DTO;
using Gamefication.Storages;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace Tests
{
    [TestClass]
    public class ApplicationTest
    {
        [TestMethod]
        public void Test()
        {
            WriteEvent();
            var thread = new Thread(EntryPoint.Main);
            thread.Start();

            Thread.Sleep(15000);

            var stateStorage = new GameficationStateStorage();
            var actualState = stateStorage.TryGetState(10);

            Assert.AreNotEqual(null, actualState);
            Assert.AreEqual(100, actualState.Loyalty);
        }

        private void WriteEvent()
        {
            using (var db = new ApplicationContext())
            {
                
                    db.Events.Add(new SqlEvent
                    {
                        CitizenId = 10,
                        CollectorId = 15,
                        TimestampTicks = new Timestamp(DateTime.Now).Ticks,
                        LotJson = JsonConvert.SerializeObject(new Lot
                        {
                            LotType = LotType.Toxic,
                            Quantity = new Quantity
                            {
                                MeasurementUnit = "kg",
                                Value = 100500
                            }
                        })
                    });

                db.SaveChanges();
            }
        }
    }
}