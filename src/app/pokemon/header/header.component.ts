import { Component, computed, Signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserStateManagementService } from '../../services/user-state-management.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private userManagement: UserStateManagementService
  ) {}

  onLogout() {
    // Clear user session and navigate to login
    this.userManagement.removeCurrentUser();
    this.router.navigate(['']);
  }

  showBtn: Signal<boolean> = computed(() => {
    if (this.userManagement.getCurrentUser()) {
      return true;
    }
    return false;
  });
}
