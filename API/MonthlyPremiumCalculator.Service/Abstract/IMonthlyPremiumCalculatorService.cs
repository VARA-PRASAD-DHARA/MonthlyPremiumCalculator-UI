using MonthlyPremiumCalculator.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Service.Abstract
{
    public interface IMonthlyPremiumCalculatorService
    {
        List<OccupationFactorDto> GetOccupationFactors();
        MonthlyPremiumDto GetMonthlyPremium(int sumInsured, decimal occupationRatingFactor, int ageInYears);
    }
}
