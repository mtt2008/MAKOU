# MAKOU Backend

Fundação inicial da API da MAKOU com Node.js, TypeScript e Fastify. Esta etapa inclui somente a rota de saúde, documentação OpenAPI e testes; não há conexão com Supabase nem funcionalidades de negócio.

## Requisitos

- Node.js 20 ou superior
- npm
- Git

## Executar localmente

No PowerShell, a partir da pasta do projeto:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

A API ficará disponível em `http://127.0.0.1:3000`. Verifique `GET /health` e abra a documentação interativa em `http://127.0.0.1:3000/docs`.

## Scripts

- `npm run dev`: inicia em modo de desenvolvimento com reinicialização automática.
- `npm run build`: compila TypeScript em `dist/`.
- `npm start`: inicia a versão compilada.
- `npm test`: executa os testes automatizados uma vez.
- `npm run test:watch`: executa os testes em modo de observação.
- `npm run typecheck`: verifica os tipos sem gerar arquivos.

## Variáveis de ambiente

Copie `.env.example` para `.env`. A aplicação valida `NODE_ENV`, `HOST`, `PORT` e `LOG_LEVEL` com Zod. Não inclua credenciais no Git; `.env` já está ignorado.

Supabase e PostgreSQL não estão conectados nesta etapa. Nenhuma variável de credencial ou migração é necessária.

## Estrutura

```text
src/
  config/       configuração e validação de ambiente
  integrations/ ponto reservado para integrações futuras
  plugins/      ponto reservado para plugins Fastify
  routes/       rotas HTTP
  schemas/      schemas Zod
  app.ts        composição da aplicação
  server.ts     inicialização HTTP
tests/          testes da API via Fastify inject
```

## Segurança inicial

A API usa cabeçalhos HTTP seguros via Helmet, limite de 100 requisições por minuto por IP e limite de corpo de 1 MiB. Erros internos são registrados no log e respondem com mensagem genérica. CORS não está habilitado por padrão.