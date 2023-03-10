using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Data.Entity
{
    public partial class OccupationRating
    {
        public string Rating { get; set; }
        public string Factor { get; set; }
        public ICollection<Occupation> Occupations { get; set; }
    }
}
