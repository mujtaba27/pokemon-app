import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { UserStateManagementService } from '../../services/user-state-management.service';
import { User } from '../../auth/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  user;
  constructor(
    private userService: UserStateManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = <User>this.userService.getCurrentUser();
  }
  subscribe() {
    const status = this.userService.updateUserSubscription(
      this.user.email,
      true
    );
    if (status) {
      this.router.navigate(['../pokemon'], { relativeTo: this.route });
    }
  }
}
