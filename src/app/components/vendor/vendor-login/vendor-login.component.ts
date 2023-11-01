import { Component, OnInit } from '@angular/core';
import { ApiAuthenticationService } from 'src/Services/Authentication/api-authentication.service';
import { ApiAuthenticationStorageService } from 'src/Services/Authentication/api-authentication-storage.service';
import { ApiGetUserIDService } from 'src/Services/Authentication/api-get-user-id.service';

@Component({
  selector: 'app-vendor-login',
  templateUrl: './vendor-login.component.html',
  styleUrls: ['./vendor-login.component.scss'],
})
export class VendorLoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private apiAuthenticationService: ApiAuthenticationService,
    private apiAuthenticationStorage: ApiAuthenticationStorageService,
    private apiGetUserIDService: ApiGetUserIDService
  ) {}

  ngOnInit(): void {
    if (this.apiAuthenticationStorage.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.apiAuthenticationStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.apiAuthenticationService.login(email, password).subscribe({
      next: (data) => {
        this.apiGetUserIDService.providerID(data.userID);
        this.apiAuthenticationStorage.saveUser(data);
        this.apiAuthenticationStorage.saveEmail(email);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.apiAuthenticationStorage.getUser().roles;
        this.redirectDashboard();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  redirectDashboard(): void {
    window.location.href = '/vendor/dashboard';
  }
}
