import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGetService } from '../../../Services/api-get.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  // pass the search input value to the router
  constructor(private router: Router, private apiGetService: ApiGetService) {}

  public zipCode: string = '';
  public pinCode: string = '';

  public getValue(value: string) {
    this.zipCode = value;
    this.router.navigate([`/searchresults/${value}`]);
  }

  public search() {
    this.router.navigate(['/searchresults']);
  }
}
