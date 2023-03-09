import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PremiumService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  getOccupationFactorInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUri}${this.occupationFactorApi}`);
  }

  //calculate age in years, months and days
  calculateAgeInYearsMonthsDays(dateOfBirth: any) {
    var timeDiff = new Date().getTime() - dateOfBirth.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var years = Math.floor(daysDiff / 365);
    var months = Math.floor(daysDiff % 365 / 30);
    var days = Math.floor(daysDiff % 365 % 30);
    return this.getFormattedAge(" year", years) + this.getFormattedAge(" month", months) + this.getFormattedAge(" day", days);
  }

  calculateAgeInYears(dateOfBirth: any) {
    var today = new Date();
    var currentMonth = today.getMonth() + 1;
    var ageInYears = today.getFullYear() - dateOfBirth.getFullYear();
    var ageInMonths = today.getMonth() - dateOfBirth.getMonth();
    return ((currentMonth > dateOfBirth.getMonth() || ((currentMonth == dateOfBirth.getMonth()) && (today.getDate() < dateOfBirth.getDate())))) ? ageInYears-- : ageInYears;
  }

  getFormattedAge(word: any, count: any) {
    return count > 0 ? (count + (count > 1 ? (word + "s") : word) + " ") : ""; // fomatted date in years, months and days
  }

  isMonthlyPremiumFormValid(monthlyPremiumInfo: any) {
    return monthlyPremiumInfo.name != "" && this.hasValue(monthlyPremiumInfo.dateOfBirthValue) && monthlyPremiumInfo.occupationRatingFactor != "Select" && monthlyPremiumInfo.sumInsured != "";
  }

  calculateMonthlyPremium(monthlyPremiumInfo: any): Observable<any> {
    let params = new HttpParams().set("sumInsured", +monthlyPremiumInfo.sumInsured)
      .set("occupationRatingFactor", parseFloat(monthlyPremiumInfo.occupationRatingFactor))
      .set("ageInYears", +monthlyPremiumInfo.ageInYears);
    return this.http.get<any>(`${this.apiBaseUri}${this.calculateMonthlyPremiumApi}`, { params: params });
  }

  getMonthlyPremiumDefaultInfo() {
    return {
      name: "",
      dateOfBirth: new Date(),
      dateOfBirthValue: "",
      occupationRatingFactor: "Select",
      sumInsured: "",
      minDate: new Date(),
      maxDate: new Date(),
      ageInYearsMonthsDays: "",
      ageInYears: 0,
      deathPremium: "",
      tpdPremiumMonthly: ""
    };
  }

  hasValue(value: any) {
    return value ? true : false;
  }

}
