using MonthlyPremiumCalculator.Data.Abstract;
using MonthlyPremiumCalculator.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Data.Repositories
{
    public class OccupationRatingRepository : IOccupationRatingRepository
    {
        public OccupationRatingRepository()
        {

        }

        public List<OccupationRating> GetOccupationRatings()
        {
            return new OccupationRating[] {
                new OccupationRating { Rating = "Professional", Factor = "1.0" },
                new OccupationRating { Rating = "White Collar", Factor = "1.25" },
                new OccupationRating { Rating = "Light Manual", Factor = "1.50" },
                new OccupationRating { Rating = "Heavy Manual", Factor = "1.75" }
            }.ToList();
        }
    }
}
