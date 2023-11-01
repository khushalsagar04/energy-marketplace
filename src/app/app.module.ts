import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { PricePlanComponent } from './components/price-plan/price-plan.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopFilterComponent } from './components/top-filter/top-filter.component';
import { PlanCardsComponent } from './components/plan-cards/plan-cards.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { VendorHeaderComponent } from './components/vendor/vendor-header/vendor-header.component';
import { VendorManagePlanComponent } from './components/vendor/vendor-manage-plan/vendor-manage-plan.component';
import { VendorDashboardComponent } from './components/vendor/vendor-dashboard/vendor-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VendorLoginComponent } from './components/vendor/vendor-login/vendor-login.component';
import { BlogCardsComponent } from './components/dashboard/blog-cards/blog-cards.component';
import { DropzoneDirective } from './dropzone.directive';
import { FilterPipe } from './components/vendor/vendor-manage-plan/vendor-manage-plan-filter.pipe';
import { NgChartsModule} from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    PricePlanComponent,
    SearchResultsComponent,

    SidebarComponent,

    TopFilterComponent,
    PlanCardsComponent,
    VendorComponent,
    VendorHeaderComponent,
    VendorManagePlanComponent,
    VendorDashboardComponent,
    VendorLoginComponent,
    BlogCardsComponent,
    DropzoneDirective,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgChartsModule  ],
  providers: [
    SearchComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
