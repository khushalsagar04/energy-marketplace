import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGetService } from 'src/Services/api-get.service';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-plan-cards',
  templateUrl: './plan-cards.component.html',
  styleUrls: ['./plan-cards.component.scss'],
})
export class PlanCardsComponent {
  data: any;
  pinCode: string = '';
  isCollapsed: boolean = true;
  selected: any;
  testinghiding: any;
  viewDetailsOpen: boolean = false;

  ngOnInit(): void {
    this.pinCode = this.route.snapshot.paramMap.get('zipcode')!;
    // get filter from url
    // this.filter = this.route.snapshot.queryParamMap.get('filter')!;
    //
    this.getPlanDetails();
  }

  constructor(
    private router: Router,
    private apiGetService: ApiGetService,
    search: SearchComponent,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}
  public zipCode: string = '';
  public zipData: string = '';

  getPlanDetails() {
    this.router.navigate([`/searchresults/${this.pinCode}`]);
    this.apiGetService.getPlanData(this.pinCode).subscribe((data: any) => {
      // Set title of the page
      this.titleService.setTitle('Energy Rates for ' + this.pinCode);

      // Loading data from the API
      this.data = data;

      // If data is empty disply error message on console
      if (this.data.length === 0) {
        console.log('No data found');
      } else {
        //
      }
    });
  }

  //Khushal's Code

  toggleCollapsed(i: any, item: any) {
    item['show'] = !item['show'];

    this.testinghiding = i;
    if (!this.viewDetailsOpen) {
      this.viewDetailsOpen = true;
    } else if (this.viewDetailsOpen) {
      this.viewDetailsOpen = false;
    }
  }
}
