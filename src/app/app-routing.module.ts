import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PricePlanComponent } from './components/price-plan/price-plan.component';
import { VendorDashboardComponent } from './components/vendor/vendor-dashboard/vendor-dashboard.component';
import { VendorLoginComponent } from './components/vendor/vendor-login/vendor-login.component';
import { VendorManagePlanComponent } from './components/vendor/vendor-manage-plan/vendor-manage-plan.component';
import { VendorComponent } from './components/vendor/vendor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'searchresults/:zipcode/:filter',
    pathMatch: 'full',
    redirectTo: '/searchresults/:zipcode/:filter',
  },
  {
    path: 'vendor',
    component: VendorComponent,
  },
  {
    path: 'vendor/dashboard',
    component: VendorDashboardComponent,
  },
  {
    path: 'vendor/manageplan',
    component: VendorManagePlanComponent,
  },
  {
    path: 'vendor/login',
    component: VendorLoginComponent,
  },

  { path: 'searchresults/:zipcode', component: PricePlanComponent },
  { path: 'searchresults/:zipcode?:filter', component: PricePlanComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
