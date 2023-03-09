using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonthlyPremiumCalculator.Service.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MonthlyPremiumCalculatorController : ControllerBase
    {
        private readonly IMonthlyPremiumCalculatorService _monthlyPremiumCalculatorService;

        public MonthlyPremiumCalculatorController(IMonthlyPremiumCalculatorService monthlyPremiumCalculatorService)
        {
            _monthlyPremiumCalculatorService = monthlyPremiumCalculatorService;
        }

        [HttpGet]
        public ActionResult GetMonthlyPremium(int sumInsured, decimal occupationRatingFactor, int ageInYears)
        {
            var result = _monthlyPremiumCalculatorService.GetMonthlyPremium(sumInsured, occupationRatingFactor, ageInYears);
            return Ok(result);
        }

    }
}
