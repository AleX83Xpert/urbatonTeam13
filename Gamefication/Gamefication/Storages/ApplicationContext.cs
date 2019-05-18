using Gamefication.DTO;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Gamefication.Storages
{
    public class ApplicationContext : DbContext
    {
        [NotNull] public DbSet<SqlGameficationState> GameficationStates { get; set; }

        [NotNull] public DbSet<SqlLastProcessedEvent> LastProcessedEvent { get; set; }

        [NotNull] public DbSet<SqlEvent> Events { get; set; }

        public void EnsureDatabaseCreated()
        {
            Database.EnsureCreated();
        }

        public void ClearDatabase()
        {
            Database.EnsureDeleted();
        }

        protected override void OnConfiguring([NotNull] DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=helloappdb;Trusted_Connection=True;");
        }
    }
}