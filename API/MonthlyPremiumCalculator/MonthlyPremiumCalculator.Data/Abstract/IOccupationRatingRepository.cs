﻿using MonthlyPremiumCalculator.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Data.Abstract
{
    public interface IOccupationRatingRepository
    {
        List<OccupationRating> GetOccupationRatings();
    }
}
