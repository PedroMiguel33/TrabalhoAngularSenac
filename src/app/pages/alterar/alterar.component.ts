import { Component } from '@angular/core';
import { ProdutoService } from '../../core/services/produtos.service';
import { Produto } from '../../core/types/types';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alterar',
  imports: [CommonModule, FormsModule],
  templateUrl: './alterar.component.html',
  styleUrl: './alterar.component.css'
})
export class AlterarComponent {
  idBusca: number | null = null;
  produto: Produto | null = null;

  categorias: string[] = [
    'Mercearia', 'Massas', 'Molhos', 'Laticínios', 'Frios', 'Padaria',
    'Bebidas', 'Higiene', 'Limpeza', 'Doces', 'Cereais', 'Outros'
  ];

  mensagem: string = '';
  tipoMensagem: 'erro' | 'sucesso' | '' = '';

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.idBusca = params['id'];
        this.buscarProduto();
      }
    });
  }

  buscarProduto() {
    if (!this.idBusca) {
      this.mensagem = 'Informe o ID!';
      this.tipoMensagem = 'erro';
      return;
    }

    this.produtoService.buscarPorId(this.idBusca).subscribe({
      next: (prod) => {
        if (prod && prod.id) {
          this.produto = { ...prod };
          this.mensagem = '';
          this.tipoMensagem = '';
        } else {
          this.produto = null;
          this.mensagem = 'Produto não encontrado!';
          this.tipoMensagem = 'erro';
        }
      },
      error: () => {
        this.produto = null;
        this.mensagem = 'Produto não encontrado!';
        this.tipoMensagem = 'erro';
      }
    });
  }

  atualizarProduto() {
    if (!this.produto) return;

    this.produtoService.alterar(this.produto).subscribe({
      next: () => {
        this.mensagem = 'Produto atualizado com sucesso!';
        this.tipoMensagem = 'sucesso';
      },
      error: () => {
        this.mensagem = 'Erro ao atualizar produto!';
        this.tipoMensagem = 'erro';
      }
    });
  }
}
