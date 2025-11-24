import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { User, UserRole } from '../../core/types/types';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  // form fields
  username = '';
  password = '';
  role: UserRole = 'user';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }

  create() {
    if (!this.username || !this.password) { alert('Preencha todos os campos'); return; }
    const novo: User = {
      username: this.username.trim(),
      password: this.password,
      role: this.role
    };
    this.usersService.addUser(novo).subscribe(() => this.load());
    this.username=''; this.password=''; this.role='user';
  }

  remove(id: string | number) {
    if (!confirm('Confirma remoção do usuário?')) { return; }
    // garantir que o id seja string
    this.usersService.deleteUser(String(id)).subscribe({
      next: () => {
        this.load();
      },
      error: (err) => {
        alert('Erro ao remover usuário!');
        console.error(err);
      }
    });
  }
}
