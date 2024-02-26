import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/Notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest = { email: '', password: '' };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private notificationService: NotificationService
    ) {}

  onSubmit() {
    this.authService.authenticate(this.loginRequest).subscribe(
      (response) => {
        console.log('Authentication successful:', response);

        localStorage.setItem('authToken', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('name', response.name);
        localStorage.setItem('familyName', response.familyName);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role.name);

        const authorityNames = response.role.authorities.map((authority: any) => authority.name);
        localStorage.setItem('authorities', JSON.stringify(authorityNames));

        this.router.navigate(['/MyCompetitions']);
        this.notificationService.show(['You have been successfully logged in'], 'success');
      },
      (error) => {
        console.error('Authentication failed:', error);
        this.notificationService.show(['Authentication failed'], 'error');
      }
    );
  }
}
