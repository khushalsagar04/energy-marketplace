import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGetService } from 'src/Services/api-get.service';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';
import { PlanCardsComponent } from '../plan-cards/plan-cards.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private apiGetService: ApiGetService,
    search: SearchComponent,
    private route: ActivatedRoute
  ) {}

  data: any;
  pinCode: string = '';
  providerNames: any = [];
  termLength: any = [];

  ngOnInit(): void {
    this.pinCode = this.route.snapshot.paramMap.get('zipcode')!;
    this.getPlanDetails();
  }

  // Gettting data from the API
  getPlanDetails() {
    this.apiGetService.getPlanData(this.pinCode).subscribe((data: any) => {
      this.data = data;

      // Getting provider names from the API in json format
      this.providerNames = this.data.map((item: any) => item.providerName);

      // Removing duplicate provider names
      this.providerNames = this.providerNames.filter(
        (item: any, index: any) => this.providerNames.indexOf(item) === index
      );

      // Getting term length from the API in json format
      this.termLength = this.data.map((item: any) => item.termLength);

      // Removing duplicate term length
      this.termLength = this.termLength.filter(
        (item: any, index: any) => this.termLength.indexOf(item) === index
      );

      // Sorting term length in ascending order
      this.termLength.sort((a: any, b: any) => a - b);
    });

    // Refresh the plan component when url is changed
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    // Refresh the plan component when url is changed
    this.router.navigate([`/searchresults/${this.pinCode}`]);
  }

  // clear all checkbox
  clearAllCheckbox() {
    this.providerNames = [];
    this.termLength = [];
    this.getPlanDetails();
  }

  // Clear only Term Length checkbox
  clearTermLength() {
    this.termLength = [];
    this.getPlanDetails();
  }

  // Clear only Provider Name checkbox
  clearProviderName() {
    this.providerNames = [];
    this.getPlanDetails();
  }

  // checkbox to checked or unchecked
  checkProviderName(providerName: any) {
    if (this.providerNames.indexOf(providerName) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
