import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    if (!this.username || !this.password) {
      this.error = 'Preencha usuário e senha.';
      return;
    }

    this.auth.login(this.username.trim(), this.password).subscribe(user => {
      if (user) {
        this.router.navigate(['/']);
      } else {
        this.error = 'Usuário ou senha inválidos.';
      }
    });
  }
}
