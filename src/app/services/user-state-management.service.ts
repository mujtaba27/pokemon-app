import { Injectable, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { User } from '../auth/services/auth.service';
import { pokemon } from '../pokemon/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class UserStateManagementService {
  private users: User[] = [
    {
      username: 'user1',
      password: 'pass1',
      email: 'test1@test.com',
      isSubscribed: true,
      favoritePokemon: new Set(),
    },
    {
      username: 'user2',
      password: 'pass2',
      email: 'test2@test.com',
      isSubscribed: false,
      favoritePokemon: new Set(),
    },
  ];

  constructor() {}

  private currentUserSubject = signal<User | null>(null);

  public userExist(email: string, password: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUserSubject.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }
    return null;
  }

  public saveUser(username: string, password: string, email: string) {
    const userExists = this.users.some((u) => u.username === username);
    if (!userExists) {
      const newUser: User = {
        username,
        password,
        email,
        isSubscribed: true,
        favoritePokemon: new Set(),
      };
      this.users.push(newUser);
      return newUser;
    }
    return null;
  }

  public saveCurrentUser() {
    localStorage.setItem('user', JSON.stringify(this.getCurrentUser()));
  }

  public removeCurrentUser() {
    localStorage.removeItem('user');
    this.currentUserSubject.set(null);
  }

  public toggleFavorite(item: string) {
    let userCurrent: User = <User>this.getCurrentUser();
    if (userCurrent?.favoritePokemon.size)
      if (userCurrent?.favoritePokemon?.has(item))
        userCurrent?.favoritePokemon?.delete(item);
      else userCurrent?.favoritePokemon?.add(item);
    else {
      userCurrent.favoritePokemon = new Set();
      userCurrent?.favoritePokemon.add(item);
    }
  }

  public getFvrtList() {
    let userCurrent: User = <User>this.getCurrentUser();
    return Array.from(userCurrent.favoritePokemon, (ele) => ({ name: ele }));
  }

  public getCurrentUser() {
    return this.currentUserSubject();
  }

  public isValueInArray(value: string) {
    if (!this.currentUserSubject()?.favoritePokemon?.size) return false;
    return this.currentUserSubject()?.favoritePokemon?.has(value);
  }

  public setCurrentUser(user: User | null) {
    this.currentUserSubject.set(user);
  }

  public resetUserPassword(email: string | null, newPassword: string) {
    const user = this.users.find((u) => u.email === email);
    if (user) {
      user.password = newPassword;
      return of(true);
    }
    return of(false);
  }

  public updateUserSubscription(email: string, status: boolean) {
    const user = this.users.find((u) => u.email === email);
    if (user) {
      user.isSubscribed = status;
      this.currentUserSubject.set(user);
      return true;
    }
    return false;
  }
}
