
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../types/types';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((users: User[]) => users.find((u: User) => u.username === email))
    );
  }

  addUser(newUser: User): Observable<User> {
    // id incremental string
    return this.getUsers().pipe(
      map(users => {
        const maxId = users.reduce((m, u) => Math.max(m, Number(u.id) || 0), 0);
        return { ...newUser, id: String(maxId + 1) };
      }),
      // post para o backend
      // usar switchMap para garantir que o post só ocorre após calcular o id
      // switchMap precisa ser importado
      // @ts-ignore
      switchMap((userWithId: User) => this.http.post<User>(this.apiUrl, userWithId))
    );
  }

  deleteUser(id: string | number): Observable<any> {
    // garantir que o id seja string
    return this.http.delete(`${this.apiUrl}/${String(id)}`);
  }
}
