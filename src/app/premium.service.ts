import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  //store will have all required inforamation for the application
  premiumDataStore: any = {};

  constructor() { }

  getOccupationInfo() {
    //update store with latest inforamation (from api) so that subscribers will get updated info
    this.premiumDataStore.occupationInfo = [
      { rating: "0", occupation: "Select" },
      { rating: "Light Manual", occupation: "Cleaner" },
      { rating: "Professional", occupation: "Doctor" },
      { rating: "White Collar", occupation: "Author" },
      { rating: "Heavy Manual", occupation: "Farmer" },
      { rating: "Heavy Manual", occupation: "Mechanic" },
      { rating: "Light Manual", occupation: "Florist" }
    ];
    return this.premiumDataStore.occupationInfo; //dispatch required information to subscriber (observer in real-time scenario)
  }

  getRatingFactorInfo() {
    this.premiumDataStore.ratingFactorInfo = [
      { rating: "Professional", factor: "1.0" },
      { rating: "White Collar", factor: "1.25" },
      { rating: "Light Manual", factor: "1.50" },
      { rating: "Heavy Manual", factor: "1.75" }
    ];
    return this.premiumDataStore.ratingFactorInfo;
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
    return monthlyPremiumInfo.name != "" && this.hasValue(monthlyPremiumInfo.dateOfBirthValue) && monthlyPremiumInfo.occupationRatingFactor != "0" && monthlyPremiumInfo.sumInsured != "";
  }

  calculateMonthlyPremium(monthlyPremiumInfo: any) {
    let premiumamount = +monthlyPremiumInfo.sumInsured * parseFloat(monthlyPremiumInfo.occupationRatingFactor) * +monthlyPremiumInfo.ageInYears;
    let deathPremium = ((premiumamount / 1000) * 12).toFixed(2);
    let tpdPremiumMonthly = (premiumamount / 1234).toFixed(2);
    return { deathPremium: deathPremium, tpdPremiumMonthly: tpdPremiumMonthly };
  }

  getMonthlyPremiumDefaultInfo() {
    return {
      name: "",
      dateOfBirth: new Date(),
      dateOfBirthValue: "",
      occupationRatingFactor: "0",
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
