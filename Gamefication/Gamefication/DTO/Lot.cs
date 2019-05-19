using JetBrains.Annotations;

namespace Gamefication.DTO
{
    public class Lot
    {
        public LotType LotType { get; set; }

        [NotNull] public Quantity Quantity { get; set; }
    }
}