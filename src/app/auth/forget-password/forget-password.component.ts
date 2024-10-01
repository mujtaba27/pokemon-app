import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [MatCardModule, MatInputModule, FormsModule, NgIf, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  email = '';
  message = '';

  constructor(private router: Router) {}

  onResetPassword() {
    // Mock the email existence check and navigate to the reset password page
    this.router.navigate(['/auth/reset-password'], {
      queryParams: { username: this.email },
    });
  }
}
