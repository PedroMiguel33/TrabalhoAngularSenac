import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { AlterarComponent } from './pages/alterar/alterar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { ExcluirComponent } from './pages/excluir/excluir.component';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PrincipalComponent } from './principal/principal.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';

export const routes: Routes = [ 
{path:'', component: PrincipalComponent},
{path:'cadastrar', component: CadastrarComponent, title: 'Cadastrar produtos'},
{path:'cadastro-cliente', component: CadastroClienteComponent, title: 'Cadastro de Cliente'},
{path:'alterar', component: AlterarComponent, title: 'Alterar produtos'},
{path:'consultar', component: ConsultarComponent, title: 'Consultar produtos'},
{path:'excluir', component: ExcluirComponent, title: 'Excluir produtos'},
{path:'listagem', component: ListagemComponent, title: 'Listar produtos'},
{path:'admin', component: AdminComponent, title: 'Administração'},
{path:'catalogo', component: PrincipalComponent, title: 'Catálogo'},
{path:'carrinho', component: CartComponent, title: 'Carrinho'},
{path:'login', component: LoginComponent, title: 'Entrar'},
{path:'**', redirectTo:'listagem'} 
];
