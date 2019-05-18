using System.ComponentModel.DataAnnotations.Schema;

namespace Gamefication.DTO
{
    [ComplexType]
    public class Quantity
    {
        public decimal? Value { get; set; }

        public string MeasurementUnit { get; set; }
    }
}