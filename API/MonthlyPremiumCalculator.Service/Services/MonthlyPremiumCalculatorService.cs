using MonthlyPremiumCalculator.Data.Abstract;
using MonthlyPremiumCalculator.Data.Models;
using MonthlyPremiumCalculator.Service.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Service.Services
{
    public class MonthlyPremiumCalculatorService : IMonthlyPremiumCalculatorService
    {
        private readonly IOccupationRatingRepository _occupationRatingRepository;
        private readonly IOccupationRepository _occupationRepository;

        public MonthlyPremiumCalculatorService(IOccupationRatingRepository occupationRatingRepository, IOccupationRepository occupationRepository)
        {
            _occupationRatingRepository = occupationRatingRepository;
            _occupationRepository = occupationRepository;
        }

        public List<OccupationFactorDto> GetOccupationFactors()
        {
            var result = (from occupation in _occupationRepository.GetOccupations()
                          join occupationRating in _occupationRatingRepository.GetOccupationRatings()
                          on occupation.Rating equals occupationRating.Rating
                          select new OccupationFactorDto
                          {
                              Occupation = occupation.Name,
                              Factor = occupationRating.Factor
                          }).ToList();
            return result;
        }

        public MonthlyPremiumDto GetMonthlyPremium(int sumInsured, decimal occupationRatingFactor, int ageInYears)
        {
            var premiumAmount = sumInsured * occupationRatingFactor * ageInYears;
            var deathPremium = string.Format("{0:0.##}", (premiumAmount / 1000) * 12);
            var tpdPremiumMonthly = string.Format("{0:0.##}", (premiumAmount / 1234));
            return new MonthlyPremiumDto { DeathPremium = deathPremium, TpdPremiumMonthly = tpdPremiumMonthly };
        }
    }
}
