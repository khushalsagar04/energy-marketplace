import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthenticationStorageService } from 'src/Services/Authentication/api-authentication-storage.service';

@Component({
  selector: 'app-vendor-header',
  templateUrl: './vendor-header.component.html',
  styleUrls: ['./vendor-header.component.scss'],
})
export class VendorHeaderComponent implements OnInit {
  activeTab: string = 'dashboard';
  userEmail: string = '';

  dropdown: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private router: Router,
    private apiAuthenticationStorageService: ApiAuthenticationStorageService
  ) {}
  ngOnInit(): void {
    this.userEmail = this.apiAuthenticationStorageService.getEmail();
    if (this.router.url === '/vendor/manageplan') {
      this.activeTab = 'manageplan';
    } else {
      this.activeTab = 'dashboard';
    }
  }

  navigateToDashboard() {
    this.router.navigate(['vendor/dashboard']);
    this.activeTab = 'dashboard';
  }
  navigateToManagePlans() {
    this.router.navigate(['vendor/manageplan']);
    this.activeTab = 'manageplan';
  }

  logout() {
    this.apiAuthenticationStorageService.clean();
    this.router.navigate(['vendor/login']);
  }
}
