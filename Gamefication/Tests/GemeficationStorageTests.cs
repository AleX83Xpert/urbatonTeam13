using Gamefication.DTO;
using Gamefication.Storages;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Tests
{
    [TestClass]
    public class GemeficationStorageTests
    {
        [TestMethod]
        public void Test()
        {
            using (var db = new ApplicationContext())
            {
                db.ClearDatabase();
                db.EnsureDatabaseCreated();
            }

            var storage = new GameficationStateStorage();
            var expectedState = new SqlGameficationState
            {
                UserId = 12,
                Loyalty = 100,
            };
            storage.UpdateState(expectedState);

            var actualState = storage.TryGetState(12);

            Assert.AreNotEqual(null, actualState);
            Assert.AreEqual(expectedState.UserId, actualState.UserId);
            Assert.AreEqual(expectedState.Loyalty, actualState.Loyalty);
        }
    }
}
