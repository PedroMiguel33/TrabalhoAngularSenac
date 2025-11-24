import { Injectable } from '@angular/core';
import { Produto } from '../types/types';
import { max } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalProdutosService {
  private storageKey = 'site_exemplo_produtos';

  // seed taken from dados/banco.json
  private seed: Produto[] = [
    {
      id: '1',
      nome: 'Açúcar 1kg',
      preco: 5.2,
      estoque: 40,
      categoria: 'Mercearia'
    }
  ];

  constructor() {
    this.ensureSeed();
    this.migrateStoredIds();
  }

  // normalize/migrate stored IDs: ensure numeric and unique sequential IDs
  private migrateStoredIds() {
    try {
      const raw = JSON.parse(localStorage.getItem(this.storageKey) || '[]') as any[];
      if (!raw || raw.length === 0) { return; }

      // parse ids and detect invalid or duplicate ids
      const parsed = raw.map((p: any) => ({ ...p, _origId: p.id, id: typeof p.id === 'string' && /^\d+$/.test(p.id) ? p.id : null }));

      // compute counts for existing string ids
      const counts = new Map<string, number>();
      let maxId = 0;
      for (const p of parsed) {
        if (p.id !== null) {
          counts.set(p.id, (counts.get(p.id) || 0) + 1);
          maxId = Math.max(maxId, Number(p.id));
        }
      }

      // assign new ids for invalid or duplicate entries
      for (const p of parsed) {
        if (p.id === null) {
          maxId += 1;
          p.id = String(maxId);
        } else if ((counts.get(p.id) || 0) > 1) {
          // duplicate id: give this entry a new unique id
          maxId += 1;
          p.id = String(maxId);
          // decrement original count to avoid reassigning all duplicates
          counts.set(p.id, 1);
        }
      }

      // write back normalized ids
      const normalized = parsed.map(p => ({ ...p, id: p.id }));
      localStorage.setItem(this.storageKey, JSON.stringify(normalized));
    } catch {
      // ignore migration errors
    }
  }

  private ensureSeed() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.seed));
    }
  }

  getAll(): Produto[] {
    try {
      const raw = JSON.parse(localStorage.getItem(this.storageKey) || '[]') as any[];
      // garantir que id seja string
      return raw.map(p => ({ ...p, id: typeof p.id === 'string' ? p.id : String(p.id) })) as Produto[];
    } catch {
      return [];
    }
  }

  add(prod: Produto) {
    const arr = this.getAll();
    // assign string id incremental
    const maxId = arr.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
    prod.id = String(maxId + 1);
    arr.push(prod);
    localStorage.setItem(this.storageKey, JSON.stringify(arr));
  }

  update(prod: Produto) {
    const arr = this.getAll();
    const idx = arr.findIndex(p => p.id === prod.id);
    if (idx >= 0) {
      arr[idx] = { ...prod, id: prod.id };
    } else {
      // if not found, assign string id and push
      const maxId = arr.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
      prod.id = String(maxId + 1);
      arr.push(prod);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(arr));
  }

  remove(id: number) {
    const arr = this.getAll().filter(p => p.id !== String(id));
    localStorage.setItem(this.storageKey, JSON.stringify(arr));
  }
}
