import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyPremiumComponent } from './monthly-premium/monthly-premium.component';

const routes: Routes = [
  { path: '', redirectTo: 'monthly-premium', pathMatch: 'full' },
  { path: 'monthly-premium', component: MonthlyPremiumComponent },
  { path: '**', redirectTo: 'monthly-premium', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
