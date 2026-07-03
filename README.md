# 💳 FinTrack

Frontend da aplicação **FinTrack**, um sistema bancário desenvolvido para simular operações financeiras de forma moderna, intuitiva e responsiva.

A aplicação consome a API do projeto, permitindo que os usuários realizem operações bancárias de forma segura através de uma interface amigável.

---

# 🚀 Funcionalidades

- 👤 Cadastro de usuários
- 🔐 Login com autenticação
- 📊 Dashboard da conta
- 💰 Depósitos
- 💸 Transferências
- 📜 Histórico de transações
- 👤 Perfil do usuário
- 📱 Interface responsiva
- 🔒 Rotas protegidas

---

# 🛠 Tecnologias Utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- Axios
- CSS3
- Context API
- JWT

---

# 📂 Estrutura do Projeto

```
src
│
├── assets
├── components
├── context
├── pages
├── routes
├── services
├── styles
├── App.jsx
└── main.jsx
```

---

# 🏗 Arquitetura

```
React + Vite
      │
      ▼
    Fetch
      │
      ▼
 FinTrack API
      │
      ▼
 PostgreSQL
```

---

# ⚙️ Instalação

Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/fintrack.git
```

Entre na pasta

```bash
cd fintrack
```

Instale as dependências

```bash
npm install
```

---

# 🔑 Variáveis de Ambiente

Crie um arquivo `.env`

```env
VITE_API_URL=http://localhost:3000
```

Caso a API esteja hospedada, altere para a URL correspondente.

---

# ▶️ Executando o Projeto

Modo desenvolvimento

```bash
npm run dev
```

Gerar build

```bash
npm run build
```

Visualizar a versão de produção

```bash
npm run preview
```

---

# 📱 Telas

- Login
- Cadastro
- Dashboard
- Depósito
- Transferência
- Histórico
- Perfil

---

# 🔐 Autenticação

Após realizar o login, o usuário recebe um **JWT Token**, utilizado para acessar as rotas protegidas da aplicação.

---

# 🎯 Objetivo

Este projeto foi desenvolvido para praticar:

- Desenvolvimento Front-end com React
- Consumo de APIs REST
- Gerenciamento de autenticação
- Componentização
- Gerenciamento de estado
- Responsividade
- Integração entre Front-end e Back-end
