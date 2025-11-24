import { Component } from '@angular/core';
import { ProdutoService } from '../../core/services/produtos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produto } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent {
  idBusca: string = '';
  produtoEncontrado: Produto | null = null;
  erroBusca: string = '';

  constructor(private produtoService: ProdutoService) {}

  buscarProduto(): void {
    this.erroBusca = '';
    this.produtoEncontrado = null;

    if (!this.idBusca || this.idBusca.trim() === '') {
      this.erroBusca = 'Informe o ID do produto.';
      return;
    }

    // extract leading number (allows '120d' -> 120)
    const idNum = parseInt(this.idBusca, 10);
    if (!Number.isFinite(idNum)) {
      this.erroBusca = 'ID inválido. Informe um número ou um texto que comece com dígitos (ex: 120d).';
      return;
    }

    this.produtoService.buscarPorId(idNum).subscribe({
      next: (produto) => {
        if (produto) {
          this.produtoEncontrado = produto;
        } else {
          this.erroBusca = 'Produto não encontrado.';
        }
      },
      error: () => {
        this.erroBusca = 'Erro ao buscar produto.';
      }
    });
  }
}
