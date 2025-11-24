import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProdutoService } from '../../core/services/produtos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-excluir',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './excluir.component.html',
  styleUrl: './excluir.component.css'
})
export class ExcluirComponent {
  idExcluir: string = '';
  mensagemSucesso: string = '';
  erroMensagem: string = '';

  // CONSTRUCTOR correto com Router injetado
  constructor(
    private produtoService: ProdutoService,
    private router: Router   // <- AQUI!
  ) { }

  excluirCliente(): void {
    this.mensagemSucesso = '';
    this.erroMensagem = '';

    if (!this.idExcluir || this.idExcluir.trim() === '') {
      this.erroMensagem = 'Informe o ID para excluir.';
      return;
    }

    const idNum = parseInt(this.idExcluir, 10);
    if (!Number.isFinite(idNum)) {
      this.erroMensagem = 'ID inválido. Informe um número ou um texto que comece com dígitos (ex: 120d).';
      return;
    }

    this.produtoService.excluir(idNum).subscribe({
      next: () => { // se excluiu
        this.mensagemSucesso = `Produto com ID ${idNum} excluído com sucesso.`;
        this.idExcluir = '';
      },
      error: () => {
        this.erroMensagem = `Erro ao excluir o produto.`;
      }
    });
  }

}
