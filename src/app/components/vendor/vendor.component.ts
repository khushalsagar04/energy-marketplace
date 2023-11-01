import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthenticationStorageService } from 'src/Services/Authentication/api-authentication-storage.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent {
  constructor(
    private router: Router,
    private apiAuthenticationStorageService: ApiAuthenticationStorageService
  ) {
    if (!this.apiAuthenticationStorageService.isLoggedIn()) {
      this.router.navigate(['vendor/login']);
    } else this.router.navigate(['vendor/dashboard']);
  }
}
