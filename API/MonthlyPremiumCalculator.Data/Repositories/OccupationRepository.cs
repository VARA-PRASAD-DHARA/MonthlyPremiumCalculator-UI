using MonthlyPremiumCalculator.Data.Abstract;
using MonthlyPremiumCalculator.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonthlyPremiumCalculator.Data.Repositories
{
    public class OccupationRepository : IOccupationRepository
    {
        public OccupationRepository()
        {

        }

        public List<Occupation> GetOccupations()
        {
            return new Occupation[] {
                new Occupation {  Name= "Cleaner", Rating = "Light Manual" },
                new Occupation {  Name= "Doctor",Rating = "Professional" },
                new Occupation {  Name= "Author", Rating = "White Collar" },
                new Occupation {  Name= "Farmer", Rating = "Heavy Manual" },
                new Occupation {  Name= "Mechanic", Rating = "Heavy Manual" },
                new Occupation {  Name= "Florist",Rating = "Light Manual" }
            }.ToList();
        }
    }
}
