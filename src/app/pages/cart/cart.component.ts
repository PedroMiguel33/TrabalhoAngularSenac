import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: CartItem[] = [];

  constructor(private cart: CartService) {
    this.cart.items$.subscribe(i => this.items = i);
  }

  remove(id?: string | number) {
    if (id == null) { return; }
    this.cart.remove(Number(id));
  }

  finalizar() {
    if (this.items.length === 0) { alert('Carrinho vazio'); return; }
    // In a real app we'd call backend; here we just clear and show confirmation
    const total = this.cart.total();
    if (confirm(`Finalizar pedido - Total R$ ${total.toFixed(2)} ?`)) {
      this.cart.clear();
      alert('Pedido finalizado. Obrigado!');
    }
  }

  change(produtoId?: string | number, delta?: number) {
    if (produtoId == null || delta == null) { return; }
    this.cart.changeQuantity(Number(produtoId), delta);
  }
}
