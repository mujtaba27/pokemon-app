import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatInputModule, FormsModule, NgIf, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  username = '';
  password = '';
  email = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    const newUser = this.authService.signup(
      this.username,
      this.password,
      this.email
    );
    if (newUser) {
      this.router.navigate(['/auth/login']);
    } else {
      this.errorMessage = 'Username already exists';
    }
  }
}
