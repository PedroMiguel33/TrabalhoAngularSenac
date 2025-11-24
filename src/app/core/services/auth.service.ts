import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../types/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private usersService: UsersService) {}

  login(email: string, senha: string): Observable<User | null> {
    return this.usersService.getUsers().pipe(
      map((users: User[]) => {
        const user = users.find((u: User) => u.username === email && u.password === senha);
        this.currentUser$.next(user || null);
        return user || null;
      })
    );

  }

  logout(): void {
    this.currentUser$.next(null);
  }
}
