# 🛒 MercadinhoApp – Sistema de Gerenciamento para Mercado

Este projeto é uma aplicação desenvolvida em **Angular** com **JSON-Server**, criada especialmente para gerenciamento de um mercadinho.  
O sistema conta com **CRUD completo de Produtos e Clientes**, além de um **Catálogo moderno** para visualização dos itens cadastrados.

O objetivo principal é oferecer uma solução prática, organizada e eficiente, ideal para estudos.
---

## 👨‍💻 Autor

- [@Pedro Miguel](https://www.linkedin.com/in/pedroomiguel/)
- [@Enzo Alvesi](https://www.linkedin.com/in/enzo-alvesi-385726270/)

---

## 🚀 Funcionalidades

### 🛍️ Produtos
- Cadastro de novos produtos
- Lista completa com filtro e busca
- Alterar informações (preço, estoque, categoria, nome)
- Exclusão com confirmação
- Catálogo estilizado e organizado para exibição ao cliente

### 👥 Clientes
- Cadastro de clientes do mercadinho
- Listagem
- Exclusão individual
- Validação de CPF, e-mail e telefone

### 🎯 Gerais
- Interface moderna e responsiva
- Componentização limpa e escalável
- Comunicação HTTP com JSON-Server
- Estrutura de services, types e models bem organizada
- Feedback visual de erro/sucesso
- Módulos independentes para melhor manutenção

---

## 🛠️ Stack utilizada

- **Framework:** Angular 17+
- **Linguagens:** TypeScript, HTML5, CSS3, JavaScript
- **Fake API:** JSON-Server
- **Ferramentas:** Angular CLI, Node.js, Visual Studio Code
- **Estilo:** CSS puro + estilos personalizados

---

## ⚙️ Inicialização do Projeto (OBRIGATÓRIO)

Para rodar o sistema corretamente, você precisa iniciar:

1️⃣ O Angular  
2️⃣ A API de clientes  
3️⃣ A API de produtos  

### 🟦 1. Rodar o projeto Angular

```bash
npx ng serve --open

json-server --watch usuarios.json
json-server --watch banco.json --port 3001

