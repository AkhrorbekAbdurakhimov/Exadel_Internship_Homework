import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
  hide: boolean = false;
  isLoggedIn: boolean = false;
  statusMessage: string = '';
  loginForm  = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value
      this.authService.login(email, password).subscribe({
        next: data => {
          this.isLoggedIn = true
          this.statusMessage = data.message
          setTimeout(() => {
            this.router.navigateByUrl('/')
          }, 500)
        },
        error: error => {
          this.statusMessage = error.error.message
        }
      })
    }
  }
}
