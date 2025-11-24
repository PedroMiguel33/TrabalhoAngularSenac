import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalProdutosService } from '../core/services/local-produtos.service';
import { ProdutoService } from '../core/services/produtos.service';
import { CartService } from '../core/services/cart.service';
import { Produto } from '../core/types/types';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy {
  produtos: Produto[] = [];
  toastVisible = false;
  toastMessage = "";
  toastTimeout: any;
  showToast = false;

  grouped: { categoria: string; produtos: Produto[] }[] = [];
  // categorias fixas e ordem desejada
  categorias: string[] = [
    'Mercearia', 'Massas', 'Molhos', 'Laticínios', 'Frios', 'Padaria',
    'Bebidas', 'Higiene', 'Limpeza', 'Doces', 'Cereais'
  ];
  activeCategory: string | null = null;
  // mapear nomes de categoria para os arquivos PNG em /public
  private categoryImageMap: Record<string, string> = {
    'Mercearia': '/mercearia.png',
    'Massas': '/massas.png',
    'Molhos': '/molhos.png',
    'Laticínios': '/laticinios.png',
    'Frios': '/frios.png',
    'Padaria': '/padaria.png',
    'Bebidas': '/bebidas.png',
    'Higiene': '/higiene.png',
    'Limpeza': '/limpeza.png',
    'Doces': '/doces.png',
    'Cereais': '/cereais.png'
  };

  getCategoryImage(cat: string): string {
    // fallback para mercearia se não houver imagem
    return this.categoryImageMap[cat] || '/mercearia.png';
  }
  // promo carousel
  promoImages: string[] = ['/propaganda1.png', '/propaganda2.png', '/propaganda3.png', '/propaganda4.png'];
  currentPromoIndex = 0;
  private promoTimer: any;
  private promoInterval = 2000; // ms
  private promoPaused = false;

  constructor(private produtosSrv: LocalProdutosService, private produtoService: ProdutoService, private cart: CartService) {}

  ngOnInit(): void {
    // Try to load from backend first; if it fails (no backend), fallback to local storage
    this.produtoService.listar().subscribe({
      next: (res) => { this.produtos = res; this.groupByCategory(); },
      error: () => {
        this.produtos = this.produtosSrv.getAll();
        this.groupByCategory();
      }
    });

    // start promo carousel
    this.startPromoCarousel();
  }

  ngOnDestroy(): void {
    this.stopPromoCarousel();
  }

  startPromoCarousel() {
    this.stopPromoCarousel();
    this.promoTimer = setInterval(() => {
      if (!this.promoPaused && this.promoImages.length > 0) {
        this.currentPromoIndex = (this.currentPromoIndex + 1) % this.promoImages.length;
      }
    }, this.promoInterval);
  }

  stopPromoCarousel() {
    if (this.promoTimer) {
      clearInterval(this.promoTimer);
      this.promoTimer = undefined;
    }
  }

  pauseCarousel() { this.promoPaused = true; }
  resumeCarousel() { this.promoPaused = false; }

  private groupByCategory() {
    const map = new Map<string, Produto[]>();
    for (const p of this.produtos) {
      const key = p.categoria || 'Outros';
      if (!map.has(key)) { map.set(key, []); }
      map.get(key)!.push(p);
    }
    // convert to array sorted by category name
    this.grouped = Array.from(map.entries()).map(([categoria, produtos]) => ({ categoria, produtos }));
    this.grouped.sort((a, b) => a.categoria.localeCompare(b.categoria));
  }

  // scroll a category row by index. dir = -1 (left) or 1 (right)
  scrollCategory(index: number, dir: number) {
    const el = document.getElementById(`grid-${index}`);
    if (!el) { return; }
    const amount = el.clientWidth * 0.7 || 500; // scroll most of the visible area
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }


  /*
  addToCart(p: Produto) {
    this.cart.add(p, 1);
    // small feedback
    alert(`Adicionado ao carrinho: ${p.nome}`);
  }
    */

addToCart(p: Produto) {
  this.cart.add(p, 1);

  this.toastMessage = `Item adicionado ao carrinho!`;
  this.showToast = true;

  // Se já existir um timer, limpa
  if (this.toastTimeout) clearTimeout(this.toastTimeout);

  // Esconde após 2,5s
  this.toastTimeout = setTimeout(() => {
    this.showToast = false;
  }, 2500);
}



  

  onCategoryClick(cat: string) {
    this.activeCategory = cat;
    // wait a tick in case DOM updates
    setTimeout(() => {
      const idx = this.grouped.findIndex(g => g.categoria === cat);
      if (idx >= 0) {
        const el = document.getElementById(`grid-${idx}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // small highlight
          el.classList.add('highlight-target');
          setTimeout(() => el.classList.remove('highlight-target'), 1200);
        }
      }
    }, 50);
  }

  scrollCategories(dir: number) {
    // dir = -1 (left) or 1 (right)
    const scroller = document.querySelector('.categories-scroll') as HTMLElement | null;
    if (!scroller) { return; }
    const item = scroller.querySelector('.cat-item') as HTMLElement | null;
    const amount = (item ? item.clientWidth : scroller.clientWidth * 0.6) + 16; // include gap
    scroller.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }
}
