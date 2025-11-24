import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Produto } from '../../core/types/types';
import { ProdutoService } from '../../core/services/produtos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { max } from 'rxjs';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  titulo = 'Cadastro de Produtos';
  produto: Produto = {} as Produto;
  categorias = [
    'Mercearia', 'Massas', 'Molhos', 'Laticínios', 'Frios', 'Padaria', 'Bebidas', 'Higiene', 'Limpeza', 'Doces', 'Cereais', 'Outros'
  ];

  constructor(
    private service: ProdutoService,
    private router: Router
  ) {}

  submeter() {
    this.service.listar().subscribe(lista => {

    
      const maxId = lista.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0);

    
      this.produto.id = String(maxId + 1);

      this.service.adicionar(this.produto).subscribe(() => {
        alert('Produto cadastrado com sucesso!');
        this.router.navigate(['/listagem']);
      });
    });
  }
}
