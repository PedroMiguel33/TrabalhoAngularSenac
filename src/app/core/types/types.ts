export interface Produto {
  id?: string;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
}

export type UserRole = 'admin' | 'user';

export interface User {
  id?: string;
  username: string;
  password: string;
  role: UserRole;
  email?: string;
  cpf?: string;
  telefone?: string;
}