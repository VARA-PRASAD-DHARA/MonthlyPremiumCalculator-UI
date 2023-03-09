import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class BaseService {
  apiBaseUri: string = environment.apiPrefix;
  occupationFactorApi: string = "api/MonthlyPremiumCalculator/GetOccupationFactor";
  calculateMonthlyPremiumApi: string = "api/MonthlyPremiumCalculator/GetMonthlyPremium";

  constructor() { }

}
