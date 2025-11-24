
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/types/types';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CadastroClienteComponent {
  clienteForm: FormGroup;
  sucesso: boolean = false;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      password: ['', Validators.required],
      telefone: ['']
    });
  }

  cadastrarCliente() {
    if (this.clienteForm.valid) {
      const formValue = this.clienteForm.value;
      const novoUsuario: User = {
        username: formValue.nome, 
        email: formValue.email,
        cpf: formValue.cpf,
        password: formValue.password,
        telefone: formValue.telefone,
        role: 'user' // padrão
      };
      this.usersService.addUser(novoUsuario).subscribe({
        next: () => {
          this.sucesso = true;
          this.clienteForm.reset();
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário:', err);
          this.sucesso = false;
        }
      });
    }
  }
}
