using System.ComponentModel.DataAnnotations.Schema;

namespace Gamefication.DTO
{
    [ComplexType]
    public class Quantity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public decimal? Value { get; set; }

        public string MeasurementUnit { get; set; }
    }
}