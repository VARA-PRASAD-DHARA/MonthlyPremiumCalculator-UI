using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonthlyPremiumCalculator.Service.Abstract;

namespace MonthlyPremiumCalculator.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OccupationFactorController : ControllerBase
    {
        private readonly IMonthlyPremiumCalculatorService _monthlyPremiumCalculatorService;

        public OccupationFactorController(IMonthlyPremiumCalculatorService monthlyPremiumCalculatorService)
        {
            _monthlyPremiumCalculatorService = monthlyPremiumCalculatorService;
        }

        [HttpGet]
        public ActionResult GetOccupationFactors()
        {
            var result = _monthlyPremiumCalculatorService.GetOccupationFactors();
            return Ok(result);
        }
    }
}
