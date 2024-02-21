import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}
  
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  hasAuthority(): boolean {
    const role = this.getRole();
    return this.isLoggedIn() && (role === 'ADMIN' || role === 'SUPER_ADMIN');
  }

  isUser(): boolean {
    const role = this.getRole();
    return this.isLoggedIn() && role === 'USER';
  
  }

  isAdmin(): boolean {
    const role = this.getRole();
    return this.isLoggedIn() && role === 'ADMIN';
  }
  
  isSuperAdmin(): boolean {
    const role = this.getRole();
    return this.isLoggedIn() && role === 'SUPER_ADMIN';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
