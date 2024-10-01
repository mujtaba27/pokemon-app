import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pokemon/header/header.component';
import { AuthService, User } from './auth/services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokemon-app';
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.getUser() != null) {
      this.router.navigate(['pokemon/home']);
    } else {
      let user = localStorage.getItem('user');
      if (user) {
        this.authService.setCurrentUser(JSON.parse(user));
        this.router.navigate(['pokemon/home']);
      }
    }
  }
}
