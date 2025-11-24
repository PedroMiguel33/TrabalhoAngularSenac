import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    CadastroClienteComponent
  ],
  providers: []
  // Remover bootstrap, pois standalone não pode ser usado aqui
})
export class AppModule { }
