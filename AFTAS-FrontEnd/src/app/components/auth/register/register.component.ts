import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      identityDocumentType: ['', [Validators.required]],
      identityNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerRequest = this.registerForm.value;
      this.authService.register(registerRequest).subscribe(
        (response) => {
          // Handle successful registration
          console.log('Registration successful:', response);
          // You might want to navigate to a different page after registration
          this.router.navigate(['/login']);
        },
        (error) => {
          // Handle registration error
          console.error('Registration error:', error);
          // You can show an error message to the user or handle it in another way
        }
      );
    }
  }
}
