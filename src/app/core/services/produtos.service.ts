import { Injectable } from '@angular/core';
import { Produto } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalProdutosService } from './local-produtos.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API = 'http://localhost:3001/produtos';

  constructor(private http: HttpClient, private local: LocalProdutosService) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API).pipe(
      map(list => list.map(p => this.normalizeProduto(p))),
      catchError(() => of(this.local.getAll()))
    );
  }

  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto).pipe(
      map(p => this.normalizeProduto(p)), 
      catchError(() => {
        // fallback: save locally and return the produto with assigned numeric id
        this.local.add(produto);
        return of(produto);
      })
    );
  }



  excluir(id: string | number): Observable<void> {
    // json-server exige que o tipo do id na URL seja igual ao tipo salvo
    const idNum = Number(id);
    return this.http.delete<void>(`${this.API}/${idNum}`).pipe(
      catchError(() => {
        // fallback: remove from local storage
        this.local.remove(idNum);
        return of(void 0);
      })
    );
  }

  alterar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/${produto.id}`, produto).pipe(
      map(p => this.normalizeProduto(p)),
      catchError(() => {
        // fallback: update locally
        this.local.update(produto);
        return of(produto);
      })
    );
  }

  consultar(id: number): Observable<Produto> {
    const idStr = String(id);
    return this.http.get<Produto>(`${this.API}/${idStr}`).pipe(
      map(p => this.normalizeProduto(p)),
      catchError(() => {
        const prod = this.local.getAll().find(p => p.id === idStr);
        return of(prod as Produto);
      })
    );
  }

  buscarPorId(id: number): Observable<Produto> {
    const idStr = String(id);
    return this.http.get<Produto>(`${this.API}/${idStr}`).pipe(
      map(p => this.normalizeProduto(p)),
      catchError(() => {
        const prod = this.local.getAll().find(p => p.id === idStr);
        return of(prod as Produto);
      })
    );
  }

  private normalizeProduto(raw: any): Produto {
    try {
      const p = { ...raw } as any;
      let idNum = NaN;
      if (p && p.id !== undefined && p.id !== null) {
        idNum = parseInt(String(p.id), 10);
        if (!Number.isFinite(idNum)) {
          idNum = Number(p.id);
        }
      }
      if (!Number.isFinite(idNum) || idNum === 0) {
        // fallback: assign a new id based on local storage
        const arr = this.local.getAll();
        const maxId = arr.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0);
        idNum = maxId + 1;
      }
      return { ...p, id: idNum } as Produto;
    } catch (e) {
      return raw as Produto;
    }
  }



  adicionar(produto: Produto): Observable<Produto> {
    return this.cadastrar(produto);
  }

}
