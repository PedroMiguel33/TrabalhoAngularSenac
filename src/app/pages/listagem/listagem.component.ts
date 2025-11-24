import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Produto } from '../../core/types/types';
import { ProdutoService} from '../../core/services/produtos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.css'
})
export class ListagemComponent implements OnInit {
  listaProduto: Produto[] = [];

  constructor(private service: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.atualizarLista();
  }

  atualizarLista() {
    // Sempre busca do backend, nunca do local
    this.service.listar().subscribe((produto) => {
      this.listaProduto = produto;
    });
  }

    excluir(id: string | number) {
      if (!id) {
        alert('ID inválido para exclusão!');
        return;
      }
      this.service.excluir(id).subscribe({
        next: () => {
          this.atualizarLista();
        },
        error: (err) => {
          alert('Erro ao excluir produto!');
          console.error(err);
        }
      });
    }

    editar(id: string | number) {
      this.router.navigate(['/alterar'], { queryParams: { id } });
    }
  
}
