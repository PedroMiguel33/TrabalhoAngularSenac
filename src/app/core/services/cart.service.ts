import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../types/types';

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'site_exemplo_cart';
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.read());
  items$ = this.itemsSubject.asObservable();

  constructor() {}

  private read(): CartItem[] {
    try {
      const raw = JSON.parse(localStorage.getItem(this.storageKey) || '[]') as any[];
      return raw.map(r => ({ produto: { ...r.produto, id: Number(r.produto.id) }, quantidade: r.quantidade })) as CartItem[];
    } catch {
      return [];
    }
  }

  private write(items: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  getAll(): CartItem[] { return this.itemsSubject.getValue(); }

  getCount(): number { return this.getAll().reduce((s, i) => s + i.quantidade, 0); }

  getCount$() {
    return this.items$;
  }

  add(produto: Produto, quantidade = 1) {
    const items = this.read();
    const existing = items.find(i => i.produto.id === produto.id);
    if (existing) {
      existing.quantidade += quantidade;
    } else {
      items.push({ produto, quantidade });
    }
    this.write(items);
  }

  /** Set exact quantity for a product. If quantity <= 0 the item is removed. */
setQuantity(produtoId: number, quantidade: number) {
  const items = this.read();
  const idx = items.findIndex(i => Number(i.produto.id) === Number(produtoId));

  if (idx === -1) { return; }

  if (quantidade <= 0) {
    items.splice(idx, 1);
  } else {
    items[idx].quantidade = quantidade;
  }

  this.write(items);
}

/** Change quantity by delta (can be negative). Removes item if result <= 0. */
changeQuantity(produtoId: number, delta: number) {
  const items = this.read();
  const idx = items.findIndex(i => Number(i.produto.id) === Number(produtoId));

  if (idx === -1) { return; }

  const newQty = (items[idx].quantidade || 0) + delta;

  if (newQty <= 0) {
    items.splice(idx, 1);
  } else {
    items[idx].quantidade = newQty;
  }

  this.write(items);
}

remove(produtoId: number) {
  const items = this.read().filter(i => Number(i.produto.id) !== Number(produtoId));
  this.write(items);
}


  clear() {
    this.write([]);
  }

  total() {
    return this.getAll().reduce((s, i) => s + (i.produto.preco * i.quantidade), 0);
  }
}
