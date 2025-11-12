# Deploy / CI

Este repositório contém dois workflows do GitHub Actions:

- `.github/workflows/ci.yml` — roda em push e pull_request para `main`. Executa:

  - instalar dependências (pnpm)
  - TypeScript typecheck (`tsc --noEmit`)
  - lint (`eslint .`)
  - build (`next build`)

- `.github/workflows/cd.yml` — roda em push para `main` e deploya para o Vercel usando o Vercel CLI.

## Secrets necessários

Adicione o seguinte secret no repositório (Settings → Secrets → Actions):

- `VERCEL_TOKEN` — token para a conta Vercel. Crie em https://vercel.com/account/tokens

Se você preferir, pode ajustar o workflow `cd.yml` para usar outros secrets ou parâmetros opcionais. Por padrão o workflow usa apenas `VERCEL_TOKEN`.

## Observações

- Os arquivos usam `pnpm`. Se o projeto usar `npm` ou `yarn`, adapte os comandos.
- O linter/validador local pode reportar mensagens sobre acesso a `secrets` em arquivos YAML; isso é apenas uma checagem estática. No GitHub Actions, `${{ secrets.VERCEL_TOKEN }}` é válido desde que o secret exista.

## Como forçar um deploy manual

Você pode executar localmente:

```
VERCEL_TOKEN=xxxx npx vercel --prod --confirm
```
