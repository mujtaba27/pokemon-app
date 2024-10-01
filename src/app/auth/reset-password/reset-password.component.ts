import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatCardModule, MatInputModule, FormsModule, NgIf, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  email: string | null = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((x) => {
      this.email = x.get('username');
    });
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      alert(this.errorMessage);
      return;
    }

    this.authService
      .resetPassword(this.email, this.newPassword)
      .subscribe((x) => {
        if (x) {
          alert('Password reset successful!');
          this.router.navigate(['/auth/login']);
        } else {
          alert('Please Try Again!');
        }
      });
  }
}
