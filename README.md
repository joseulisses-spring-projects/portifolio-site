# React + Vite

## Integração com o `auth-service` (backend)

Este front foi feito para integrar com o backend:
https://github.com/joseulisses-spring-projects/auth-service (branch `dev`).

- Base URL (local): `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Health check: `http://localhost:8080/actuator/health`

### Endpoints usados no front

- `POST /users` (criar usuário)
- `POST /auth/login` (login → retorna `{ "token": "..." }`)
- `GET /me` (rota protegida)

Para rotas protegidas, o front envia: `Authorization: Bearer <token>`.

### Configuração de ambiente (Vite)

Vite só carrega variáveis a partir de `.env`, `.env.local`, etc.
Este projeto já inclui:

- `.env.example` (modelo)
- `.env` (para desenvolvimento local; está no `.gitignore`)

Variável usada:

- `VITE_API_URL=http://localhost:8080`

Observação: o arquivo `urlApi.env` existe no repo, mas **não é carregado automaticamente** pelo Vite.

### Rodando (local)

1) Suba o backend (no repo `auth-service`). Se tiver CORS habilitado por env var, configure:

- `CORS_ALLOWED_ORIGINS=http://localhost:5173`

2) Rode o front:

- `npm install`
- `npm run dev`

3) Abra o demo:

- `http://localhost:5173/demo/auth`

Você consegue fazer Register, Login e testar a rota protegida `/me`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
