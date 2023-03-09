using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MonthlyPremiumCalculator.Data.Abstract;
using MonthlyPremiumCalculator.Data.Repositories;
using MonthlyPremiumCalculator.Service.Abstract;
using MonthlyPremiumCalculator.Service.Services;

namespace MonthlyPremiumCalculator.API.AppBuilderExtensions
{
    public static class DependenciesExtensions
    {
        public static IServiceCollection ConfigureDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IOccupationRepository, OccupationRepository>();
            services.AddTransient<IOccupationRatingRepository, OccupationRatingRepository>();
            services.AddTransient<IMonthlyPremiumCalculatorService, MonthlyPremiumCalculatorService>();
            return services;
        }
    }
}
