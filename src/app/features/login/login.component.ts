import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/User/login.service';
import { WebAPILoginKey } from '../../Model/ViewModel/WebAPILoginKey';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginServices: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const dataSend: WebAPILoginKey = this.setUserAPISend(username, password);
      this.loginServices.login(dataSend).subscribe(response=>
      {

      },error=>{

      });
    }
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; // Toggle password visibility
  }

  private setUserAPISend(username: string, password: string): WebAPILoginKey {
    return {
      apiCode: 0,
      apiAppName: "",
      apiKeyOwner: "",
      keyStatus: true,
      apiKey: "",
      createDate: new Date(),
      Username: username,
      Password: password
    };
  }
}
