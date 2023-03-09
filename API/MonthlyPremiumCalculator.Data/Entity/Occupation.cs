using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Data.Entity
{
    public class Occupation
    {
        public string Name { get; set; }
        public string Rating { get; set; }
        public OccupationRating OccupationRating { get; set; }
    }
}
