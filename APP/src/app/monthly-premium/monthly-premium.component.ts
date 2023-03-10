import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PremiumService } from '../premium.service';
import { ToastrService } from '../toastr.service';

@Component({
  selector: 'app-monthly-premium',
  templateUrl: './monthly-premium.component.html',
  styleUrls: ['./monthly-premium.component.scss']
})

export class MonthlyPremiumComponent implements OnInit {
  occupationInfo: any = [];
  monthlyPremiumInfo = {} as any;

  constructor(private premiumService: PremiumService, private changeDetector: ChangeDetectorRef, private toastrService: ToastrService) {
    this.monthlyPremiumInfo = this.premiumService.getMonthlyPremiumDefaultInfo();
    this.setDateOfBirthMinMaxDates();
  }

  ngOnInit() { this.getOccupationAndRefactorInfo(); }

  setDateOfBirthMinMaxDates() {
    this.monthlyPremiumInfo.minDate.setFullYear(this.monthlyPremiumInfo.minDate.getFullYear() - 70); //limited date to 70 years age
    this.monthlyPremiumInfo.maxDate.setDate(this.monthlyPremiumInfo.maxDate.getDate()); // today
  }

  getOccupationAndRefactorInfo() {
    this.occupationInfo = [];
    this.premiumService.getOccupationFactorInfo().subscribe({
      next: (result) => {
        this.occupationInfo = result;
        this.occupationInfo.unshift({ occupation: "Select", factor: "Select" });
      },
      error: (e) => console.error(e)
    });
  }

  onDateOfBirthChange(dateOfBirth: any) {
    if (dateOfBirth) {
      this.monthlyPremiumInfo.ageInYearsMonthsDays = this.premiumService.calculateAgeInYearsMonthsDays(dateOfBirth);
      this.monthlyPremiumInfo.ageInYears = this.premiumService.calculateAgeInYears(dateOfBirth);
    }
    this.monthlyPremiumInfo.dateOfBirthValue = dateOfBirth;
  }

  onNameChange(event: any) {
    this.monthlyPremiumInfo.deathPremium = "";
    this.monthlyPremiumInfo.tpdPremiumMonthly = "";
  }

  onSumInsuredChange(event: any) {
    this.monthlyPremiumInfo.deathPremium = "";
    this.monthlyPremiumInfo.tpdPremiumMonthly = "";
  }

  onOccupationChange(event: any) {
    this.monthlyPremiumInfo.occupationRatingFactor = this.occupationInfo[event.target.selectedIndex].factor;
    this.calculateMonthlyPremium();
  }

  calculateMonthlyPremium() {
    if (this.premiumService.isMonthlyPremiumFormValid(this.monthlyPremiumInfo)) {
      this.premiumService.calculateMonthlyPremium(this.monthlyPremiumInfo).subscribe({
        next: (result) => {
          this.monthlyPremiumInfo = { ...this.monthlyPremiumInfo, ...result };
        },
        error: (e) => console.error(e)
      });
    }
    else {
      this.toastrService.error("Please fill all required fields");
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