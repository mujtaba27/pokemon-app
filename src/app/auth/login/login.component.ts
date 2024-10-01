import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserStateManagementService } from '../../services/user-state-management.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgIf,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.getUser()?.isSubscribed) {
      this.router.navigate(['../../pokemon'], { relativeTo: this.route });
    }
  }

  onLogin() {
    const user = this.authService.login(this.email, this.password);
    if (user) {
      if (user.isSubscribed) {
        this.router.navigate(['../../pokemon'], { relativeTo: this.route });
      } else {
        this.router.navigate(['../../info'], { relativeTo: this.route });
      }
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
