import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/types/types';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isLogged = false;
  user: User | null = null;
  private sub: Subscription | null = null;
  cartCount = 0;
  private cartSub: Subscription | null = null;

  constructor(private auth: AuthService, private cartService: CartService, private router: Router) {
    // expose cartService on instance so ngOnInit can subscribe without changing many places
    (this as any).cart = this.cartService;
  }

  ngOnInit(): void {
    this.sub = this.auth.currentUser$.subscribe(u => {
      this.user = u;
      this.isLogged = !!u;
      this.isAdmin = !!u && u.role === 'admin';
    });
    // subscribe to cart count
    this.cartSub = this.cartService.items$.subscribe(items => this.cartCount = items.reduce((s,i)=>s+i.quantidade,0));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.cartSub?.unsubscribe();
  }

  promptLogin() {
    // Navigate to the login page (the dedicated login screen handles authentication)
    this.router.navigate(['/login']);
  }

    promptCadastrar() {
    // Navigate to the login page (the dedicated login screen handles authentication)
    this.router.navigate(['/cadastro-cliente']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/catalogo']);
  }
}
