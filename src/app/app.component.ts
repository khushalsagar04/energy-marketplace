import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'energy-marketplace-ui';

  router: string;

  constructor(public _router: Router) {
    this.router = _router.url;
  }

  search(pageName: string) {
    this._router.navigate(['/' + pageName]);
  }
}
