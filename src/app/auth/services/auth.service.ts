import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStateManagementService } from '../../services/user-state-management.service';

export interface User {
  username: string;
  password: string;
  email: string;
  isSubscribed: boolean;
  favoritePokemon: Set<string>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userManagementService: UserStateManagementService) {}

  login(email: string, password: string) {
    return this.userManagementService.userExist(email, password);
  }

  signup(username: string, password: string, email: string) {
    return this.userManagementService.saveUser(username, password, email);
  }

  resetPassword(
    email: string | null,
    newPassword: string
  ): Observable<boolean> {
    return this.userManagementService.resetUserPassword(email, newPassword);
  }

  updateUserSubscriptionStatus(email: string, status: boolean): boolean {
    return this.userManagementService.updateUserSubscription(email, status);
  }

  getUser() {
    return this.userManagementService.getCurrentUser();
  }

  setCurrentUser(user: User) {
    return this.userManagementService.setCurrentUser(user);
  }
}
