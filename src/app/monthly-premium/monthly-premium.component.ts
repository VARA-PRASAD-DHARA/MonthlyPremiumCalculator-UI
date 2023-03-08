import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PremiumService } from '../premium.service';

@Component({
  selector: 'app-monthly-premium',
  templateUrl: './monthly-premium.component.html',
  styleUrls: ['./monthly-premium.component.scss']
})

export class MonthlyPremiumComponent implements OnInit {
  occupationInfo: any = [];
  ratingFactorInfo: any = [];
  monthlyPremiumInfo = {} as any;

  constructor(private premiumService: PremiumService, private changeDetector: ChangeDetectorRef) {
    this.monthlyPremiumInfo = this.premiumService.getMonthlyPremiumDefaultInfo();
    this.setDateOfBirthMinMaxDates();
  }

  ngOnInit() { this.getOccupationAndRefactorInfo(); }

  setDateOfBirthMinMaxDates() {
    this.monthlyPremiumInfo.minDate.setFullYear(this.monthlyPremiumInfo.minDate.getFullYear() - 70); //limited date to 70 years age
    this.monthlyPremiumInfo.maxDate.setDate(this.monthlyPremiumInfo.maxDate.getDate()); // today
  }

  getOccupationAndRefactorInfo() {
    this.occupationInfo = this.premiumService.getOccupationInfo();
    this.ratingFactorInfo = this.premiumService.getRatingFactorInfo();
  }

  onDateOfBirthChange(dateOfBirth: any) {
    if (dateOfBirth) {
      this.monthlyPremiumInfo.ageInYearsMonthsDays = this.premiumService.calculateAgeInYearsMonthsDays(dateOfBirth);
      this.monthlyPremiumInfo.ageInYears = this.premiumService.calculateAgeInYears(dateOfBirth);
    }
    this.monthlyPremiumInfo.dateOfBirthValue = dateOfBirth;
  }

  onOccupationChange(event: any) {
    let selectedRating = this.occupationInfo[event.target.selectedIndex].rating;
    this.monthlyPremiumInfo.occupationRatingFactor = selectedRating === "0" ? "0" : this.ratingFactorInfo.find((r: any) => r.rating == selectedRating).factor;
    this.calculateMonthlyPremium();
  }

  calculateMonthlyPremium() {
    if (this.premiumService.isMonthlyPremiumFormValid(this.monthlyPremiumInfo)) {
      let premium = this.premiumService.calculateMonthlyPremium(this.monthlyPremiumInfo);
      this.monthlyPremiumInfo = { ...this.monthlyPremiumInfo, ...premium };
    }
    else {
      alert("Please fill all required fields");
    }
  }

  acceptNumbersOnly(event: any): boolean {
    var regExp = new RegExp(/^-?\d+(\.\d+)?$/);
    return regExp.test(event.key);
  }

  reset() {
    this.monthlyPremiumInfo = this.premiumService.getMonthlyPremiumDefaultInfo();
    this.setDateOfBirthMinMaxDates();
    this.getOccupationAndRefactorInfo();
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

}