using System;
using System.Collections.Generic;
using JetBrains.Annotations;
using Newtonsoft.Json;

namespace Gamefication.DTO
{
    [JsonConverter(typeof(StringTimestampConverter))]
    public sealed class Timestamp : IEquatable<Timestamp>, IComparable<Timestamp>
    {
        public static readonly Timestamp MinValue = new Timestamp(DateTime.MinValue.Ticks);
        public static readonly Timestamp MaxValue = new Timestamp(DateTime.MaxValue.Ticks);

        public Timestamp(DateTime timestamp)
            : this(timestamp.ToUniversalTime().Ticks)
        {
        }

        [UsedImplicitly]
        private Timestamp()
            : this(MinValue.Ticks)
        {
        }

        public Timestamp(DateTimeOffset timestamp)
            : this(timestamp.UtcTicks)
        {
        }

        public Timestamp(long ticks)
        {
            if (ticks < DateTime.MinValue.Ticks || ticks > DateTime.MaxValue.Ticks)
                throw new ArgumentOutOfRangeException(nameof(ticks),
                    $"Ticks {ticks} is not in range [{DateTime.MinValue.Ticks}, {DateTime.MaxValue.Ticks}]");
            Ticks = ticks;
        }

        public long Ticks { get; }

        public int CompareTo([CanBeNull] Timestamp other)
        {
            return other == null ? 1 : Comparer<long>.Default.Compare(Ticks, other.Ticks);
        }

        public bool Equals([CanBeNull] Timestamp other)
        {
            if (ReferenceEquals(null, other))
                return false;
            if (ReferenceEquals(this, other))
                return true;
            return Ticks == other.Ticks;
        }

        public DateTime ToDateTime()
        {
            return new DateTime(Ticks, DateTimeKind.Utc);
        }

        public DateTimeOffset ToDateTimeOffset()
        {
            return new DateTimeOffset(Ticks, TimeSpan.Zero);
        }

        public override string ToString()
        {
            return $"Ticks: {Ticks}, DateTime: {ToDateTime():O}";
        }

        public override bool Equals([CanBeNull] object obj)
        {
            if (ReferenceEquals(null, obj))
                return false;
            if (ReferenceEquals(this, obj))
                return true;
            if (obj.GetType() != GetType())
                return false;
            return Equals((Timestamp) obj);
        }

        public override int GetHashCode()
        {
            return Ticks.GetHashCode();
        }

        public static bool operator ==([CanBeNull] Timestamp left, [CanBeNull] Timestamp right)
        {
            return Equals(left, right);
        }

        public static bool operator !=([CanBeNull] Timestamp left, [CanBeNull] Timestamp right)
        {
            return !Equals(left, right);
        }

        public static bool operator <([CanBeNull] Timestamp left, [CanBeNull] Timestamp right)
        {
            return Comparer<Timestamp>.Default.Compare(left, right) < 0;
        }

        public static bool operator >([CanBeNull] Timestamp left, [CanBeNull] Timestamp right)
        {
            return Comparer<Timestamp>.Default.Compare(left, right) > 0;
        }

        public static bool operator <=([CanBeNull] Timestamp left, [CanBeNull] Timestamp right)
        {
            return Comparer<Timestamp>.Default.Compare(left, right) <= 0;
        }

        public static bool operator >=([CanBeNull] Timestamp left, [CanBeNull] Timestamp right)
        {
            return Comparer<Timestamp>.Default.Compare(left, right) >= 0;
        }

        public static Timestamp operator +([NotNull] Timestamp left, TimeSpan right)
        {
            var ticks = left.Ticks + right.Ticks;
            return new Timestamp(ticks);
        }

        public static Timestamp operator -([NotNull] Timestamp left, TimeSpan right)
        {
            var ticks = left.Ticks - right.Ticks;
            return new Timestamp(ticks);
        }

        public static TimeSpan operator -([NotNull] Timestamp left, [NotNull] Timestamp right)
        {
            var ticks = left.Ticks - right.Ticks;
            return new TimeSpan(ticks);
        }

        [NotNull]
        public Timestamp Subtract(TimeSpan value)
        {
            return this - value;
        }

        public TimeSpan Subtract([NotNull] Timestamp value)
        {
            return this - value;
        }

        [NotNull]
        public Timestamp Add(TimeSpan value)
        {
            return this + value;
        }

        [NotNull]
        public Timestamp AddDays(double value)
        {
            return this + TimeSpan.FromDays(value);
        }

        [NotNull]
        public Timestamp AddHours(double value)
        {
            return this + TimeSpan.FromHours(value);
        }

        [NotNull]
        public Timestamp AddMinutes(double value)
        {
            return this + TimeSpan.FromMinutes(value);
        }

        [NotNull]
        public Timestamp AddSeconds(double value)
        {
            return this + TimeSpan.FromSeconds(value);
        }

        [NotNull]
        public Timestamp AddMilliseconds(double value)
        {
            return this + TimeSpan.FromMilliseconds(value);
        }

        [NotNull]
        public Timestamp AddTicks(long value)
        {
            return this + TimeSpan.FromTicks(value);
        }
    }
}