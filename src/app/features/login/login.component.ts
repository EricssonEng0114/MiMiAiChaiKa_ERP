import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../Services/Common/API/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiServices: APIService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // this.authService.login(email, password).subscribe(
      //   response => {
      //     console.log('Login successful', response);
      //     this.router.navigate(['/dashboard']);
      //   },
      //   error => {
      //     console.error('Login failed', error);
      //   }
      // );
    }
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
